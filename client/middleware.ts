import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const adminToken = request.cookies.get('adminToken');
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

  // If trying to access admin routes without token
  if (isAdminRoute && !adminToken) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // If trying to access login/register with token
  if (adminToken && (request.nextUrl.pathname === '/admin/login' || request.nextUrl.pathname === '/admin/register')) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};