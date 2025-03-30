import { createGatewayMiddleware } from "@repo/ui/middleware/middleware";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BASE_PATH = '/aviation-hubspace';

// Create gateway middleware
const gatewayMiddleware = createGatewayMiddleware({
  apps: {
    "aviation-hubspace": {
      loginPath: "/login",
      basePath: BASE_PATH,
      port: 3002,
      authRequired: false,
      excludePaths: ["/", "/login", "/api/auth", "/_next", "/dashboard", "/products", "/reference"]
    }
  },
  defaultApp: "aviation-hubspace"
});

export function middleware(request: NextRequest) {
  // Skip middleware in standalone mode
  if (process.env.NEXT_PUBLIC_STANDALONE === 'true') {
    return NextResponse.next();
  }

  // In gateway mode
  const { pathname } = request.nextUrl;
  
  // If at root, redirect to /aviation-hubspace
  if (pathname === '/') {
    return NextResponse.redirect(new URL(BASE_PATH, request.url));
  }

  return gatewayMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
}; 