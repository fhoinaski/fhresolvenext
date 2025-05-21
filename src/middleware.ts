import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET;
  // Obtém o token e as informações do usuário (incluindo a role)
  const token = await getToken({ req, secret });
  const isAuthenticated = !!token;
  const userRole = token?.role as string | undefined; // Obtém a role do token

  const pathname = req.nextUrl.pathname;

  // --- Proteção do Dashboard ---
  if (pathname.startsWith('/dashboard')) {
    if (!isAuthenticated) {
      // 1. Se NÃO está autenticado, redireciona para login
      const loginUrl = new URL('/login', req.url);
      // Opcional: Adiciona a URL de callback para redirecionar de volta após login
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // 2. Se ESTÁ autenticado, verifica a role
    if (userRole !== 'admin') {
      // 3. Se NÃO é admin, redireciona para a página pública inicial
      return NextResponse.redirect(new URL('/', req.url));
    }

    // 4. Se é admin autenticado, permite o acesso ao dashboard
    return NextResponse.next();
  }

  // --- Tratamento da Página de Login ---
  if (pathname === '/login') {
    if (isAuthenticated) {
      // 5. Se já está autenticado, redireciona para o dashboard (evita ver login novamente)
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    // Se não está autenticado, permite acessar a página de login
    return NextResponse.next();
  }

  // --- Outras Páginas (Públicas) ---
  // Se a rota não for /dashboard/* nem /login, permite o acesso (incluindo a '/')
  // Esta linha só será alcançada para rotas DENTRO do matcher que não foram tratadas acima.
  // Como o matcher SÓ inclui /login e /dashboard/*, rotas públicas como '/' NUNCA
  // deveriam acionar este middleware.
  return NextResponse.next();
}

export const config = {
  // O matcher continua o mesmo, pois ele define *quais* rotas acionam o middleware.
  // A lógica DENTRO do middleware é que decide o que fazer com essas rotas.
  // Rotas públicas como '/' ou '/portfolio' NÃO estão no matcher e não passam por aqui.
  matcher: ['/login', '/dashboard/:path*'],
};