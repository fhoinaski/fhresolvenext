import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuthenticated = !!token;
  
  const isAuthPage = req.nextUrl.pathname === '/login';
  const isDashboardPage = req.nextUrl.pathname.startsWith('/dashboard');
  
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
  
  if (!isAuthenticated && isDashboardPage) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/dashboard/:path*'],
};