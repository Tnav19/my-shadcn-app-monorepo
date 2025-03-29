import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const referer = request.headers.get('referer');
  const isFromHealthcare = referer?.includes('/industries/healthcare');
  
  // If not coming from healthcare industry page, redirect to company intranet
  if (!isFromHealthcare) {
    return NextResponse.redirect(new URL('/', 'http://localhost:3000'));
  }

  // Check if user is authenticated
  const isAuthenticated = request.cookies.has('auth-token');

  // If not authenticated and trying to access protected routes, redirect to login
  if (!isAuthenticated && !request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}; 