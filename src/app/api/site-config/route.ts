// src/app/api/site-config/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import SettingsModel from '@/models/settings';
import { z } from 'zod';

interface SiteConfig {
  siteName: string;
  siteDescription: string;
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  socialMedia: {
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
  };
  tracking?: {
    facebookPixel?: string;
    tiktokPixel?: string;
    googleTagManager?: string;
  };
  updatedAt: Date;
}

const SiteConfigSchema = z.object({
  siteName: z.string().min(1, 'Nome do site é obrigatório'),
  siteDescription: z.string().min(1, 'Descrição é obrigatória'),
  contactInfo: z.object({
    email: z.string().email('Email inválido'),
    phone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
    address: z.string().min(5, 'Endereço muito curto'),
  }),
  socialMedia: z.object({
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    whatsapp: z.string().min(10, 'WhatsApp deve ter pelo menos 10 dígitos').optional(),
  }),
  tracking: z.object({
    facebookPixel: z.string().optional(),
    tiktokPixel: z.string().optional(),
    googleTagManager: z.string().optional(),
  }).optional(),
});

const defaultConfig: SiteConfig = {
  siteName: 'FH Resolve',
  siteDescription: 'Serviços profissionais de manutenção residencial em Florianópolis',
  contactInfo: {
    email: 'contato@fhresolve.com.br',
    phone: '48991919791',
    address: 'Ratones, Florianópolis - SC',
  },
  socialMedia: {
    instagram: '',
    facebook: '',
    whatsapp: '48991919791',
  },
  tracking: {
    facebookPixel: '',
    tiktokPixel: '',
    googleTagManager: '',
  },
  updatedAt: new Date(),
};

let cachedConfig: SiteConfig | null = null;
let cacheTime = 0;
const CACHE_TTL = 60 * 60 * 1000;

async function getConfig(): Promise<SiteConfig> {
  const now = Date.now();
  if (cachedConfig && now - cacheTime < CACHE_TTL) return cachedConfig;

  await dbConnect();  const siteConfig = await SettingsModel.findOne({}).lean() as SiteConfig | null;

  if (!siteConfig) {
    await SettingsModel.create(defaultConfig);
    cachedConfig = defaultConfig;
    cacheTime = now;
    return defaultConfig;
  }

  // Garantindo que todos os campos obrigatórios existam
  cachedConfig = {
    ...defaultConfig,
    ...siteConfig,
    updatedAt: siteConfig.updatedAt || new Date(),
    contactInfo: { ...defaultConfig.contactInfo, ...siteConfig.contactInfo },
    socialMedia: { ...defaultConfig.socialMedia, ...siteConfig.socialMedia },
    tracking: { ...defaultConfig.tracking, ...siteConfig.tracking }
  };
  cacheTime = now;
  return cachedConfig;
}

export async function GET() {
  try {
    const config = await getConfig();
    return NextResponse.json(config);
  } catch (error) {
    console.error('Erro ao buscar configurações:', error);
    return NextResponse.json({ error: 'Erro ao buscar configurações' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const data = await request.json();
    const validatedData = SiteConfigSchema.parse(data);

    await dbConnect();
    const config = await SettingsModel.findOneAndUpdate(
      {},
      { ...validatedData, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    // Limpar cache
    cachedConfig = null;
    cacheTime = 0;

    return NextResponse.json(config);
  } catch (error) {
    console.error('Erro ao salvar configurações:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dados inválidos', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Erro ao salvar configurações' }, { status: 500 });
  }
}