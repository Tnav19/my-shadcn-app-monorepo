import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export interface AppConfig {
  loginPath: string;
  basePath: string;
  port: number;
  authRequired: boolean;
  excludePaths?: string[];
}

export interface GatewayConfig {
  apps: Record<string, AppConfig>;
  defaultApp: string;
}

export function createGatewayMiddleware(config: GatewayConfig) {
  return function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    // Find which app the request is for
    const app = Object.entries(config.apps).find(([_, appConfig]) => 
      pathname.startsWith(appConfig.basePath) || pathname === appConfig.basePath
    );

    if (!app) {
      return NextResponse.next();
    }

    const [appName, appConfig] = app;
    
    // Skip auth check for excluded paths
    if (appConfig.excludePaths?.some((path: string) => pathname.startsWith(path))) {
      // For excluded paths in non-default apps, rewrite to their port
      if (appName !== config.defaultApp) {
        const url = new URL(request.url);
        url.port = appConfig.port.toString();
        return NextResponse.rewrite(url);
      }
      return NextResponse.next();
    }

    // Check if user is authenticated for this app
    const authToken = request.cookies.get('auth-token');
    const isLoginPage = pathname === appConfig.loginPath;

    // If not authenticated and trying to access protected route, redirect to login
    if (appConfig.authRequired && !authToken && !isLoginPage) {
      const loginUrl = new URL(appConfig.loginPath, request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // For non-default apps, proxy to their port
    if (appName !== config.defaultApp) {
      const url = new URL(request.url);
      url.port = appConfig.port.toString();
      return NextResponse.rewrite(url);
    }

    return NextResponse.next();
  };
}

export const defaultMatcher = [
  '/((?!_next/static|_next/image|favicon.ico).*)',
]; 