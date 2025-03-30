import { createGatewayMiddleware } from "@repo/ui/middleware/middleware";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Check if we're running in standalone mode (port 3001)
const isStandalone = process.env.PORT === '3001';

const gatewayMiddleware = createGatewayMiddleware({
  apps: {
    "medi-lab": {
      loginPath: "/login",
      basePath: "/medi-lab",
      port: 3001,
      authRequired: true,
      excludePaths: ["/login", "/api/auth", "/_next", "/templates"]
    }
  },
  defaultApp: "medi-lab"
});

// Create a wrapper middleware that handles both standalone and gateway modes
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // In standalone mode, handle routes without the prefix
  if (isStandalone) {
    // Check if user is authenticated
    const authToken = request.cookies.get('auth-token');
    const isLoginPage = pathname === '/login';
    const isPublicPath = pathname.startsWith('/api/auth') || 
                        pathname.startsWith('/_next') || 
                        pathname.startsWith('/templates');

    // Allow public paths
    if (isPublicPath) {
      return NextResponse.next();
    }

    // If not authenticated and trying to access protected route, redirect to login
    if (!authToken && !isLoginPage) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // If authenticated and trying to access login page, redirect to templates dashboard
    if (authToken && isLoginPage) {
      return NextResponse.redirect(new URL('/medi-lab/templates/dashboard', request.url));
    }

    return NextResponse.next();
  }

  // In gateway mode, use the gateway middleware
  return gatewayMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
}; 