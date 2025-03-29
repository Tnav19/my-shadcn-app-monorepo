import { NextResponse } from 'next/server'

export function middleware() {
  // Allow access to all pages
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
} 