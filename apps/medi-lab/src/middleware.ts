import { createGatewayMiddleware } from "@repo/ui/middleware/middleware";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Check if we're running in standalone mode (port 3001)
const isStandalone = process.env.PORT === '3001';

const gatewayMiddleware = createGatewayMiddleware({
  apps: {
    "medi-lab": {
      loginPath: isStandalone ? "/login" : "/login",
      basePath: isStandalone ? "" : "",
      port: 3001,
      authRequired: true,
      excludePaths: isStandalone 
        ? ["/login", "/templates"]
        : ["/login", "/templates"]
    }
  },
  defaultApp: "medi-lab"
});

// Create a wrapper middleware that handles both standalone and gateway modes
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // In standalone mode, handle routes without the  prefix
  if (isStandalone) {
    // Check if user is authenticated
    const isAuthenticated = request.cookies.has('medi-lab-auth');
    const isLoginPage = pathname === '/login';

    // If not authenticated and trying to access protected route, redirect to login
    if (!isAuthenticated && !isLoginPage && !pathname.startsWith('/templates')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // If authenticated and trying to access login page, redirect to dashboard
    if (isAuthenticated && isLoginPage) {
      return NextResponse.redirect(new URL('/templates/dashboard', request.url));
    }

    return NextResponse.next();
  }

  // In gateway mode, use the gateway middleware
  return gatewayMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}; 