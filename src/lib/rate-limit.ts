// Exemplo de middleware de rate limiting para proteger a API de contact
// Arquivo: src/lib/rate-limit.ts

import { NextRequest } from 'next/server';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

export function rateLimit(
  request: NextRequest,
  options: {
    interval: number; // intervalo em milissegundos
    uniqueTokenPerInterval: number; // número máximo de requests por intervalo
  }
) {
  const token = getIP(request);
  const now = Date.now();
  const tokenBucket = store[token];

  if (!tokenBucket) {
    store[token] = {
      count: 1,
      resetTime: now + options.interval,
    };
    return { success: true };
  }

  if (now > tokenBucket.resetTime) {
    tokenBucket.count = 1;
    tokenBucket.resetTime = now + options.interval;
    return { success: true };
  }

  if (tokenBucket.count >= options.uniqueTokenPerInterval) {
    return { 
      success: false, 
      error: 'Rate limit exceeded' 
    };
  }

  tokenBucket.count++;
  return { success: true };
}

function getIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const ip = forwarded ? forwarded.split(',')[0] : realIP;
  return ip || 'unknown';
}

// Exemplo de uso na API:
/*
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  // Rate limiting: máximo 3 emails por 10 minutos por IP
  const rateLimitResult = rateLimit(request, {
    interval: 10 * 60 * 1000, // 10 minutos
    uniqueTokenPerInterval: 3, // 3 requests por intervalo
  });

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Muitas tentativas. Tente novamente em 10 minutos.' },
      { status: 429 }
    );
  }

  // Resto da lógica da API...
}
*/
