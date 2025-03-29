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
      return NextResponse.next();
    }

    // Check if user is authenticated for this app
    const authToken = request.cookies.get(`${appName}-auth`);
    const isLoginPage = pathname === appConfig.loginPath;

    // If not authenticated and trying to access protected route, redirect to login
    if (appConfig.authRequired && !authToken && !isLoginPage) {
      return NextResponse.redirect(new URL(appConfig.loginPath, request.url));
    }

    // If authenticated and trying to access login page, redirect to app home
    if (authToken && isLoginPage) {
      return NextResponse.redirect(new URL(appConfig.basePath, request.url));
    }

    // For authenticated requests to other apps, proxy to their port
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