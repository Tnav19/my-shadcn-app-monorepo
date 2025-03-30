import { createGatewayMiddleware } from '@repo/ui/middleware/index';

const middleware = createGatewayMiddleware({
  defaultApp: 'company-intranet',
  apps: {
    'medi-lab': {
      loginPath: '/medi-lab/login',
      basePath: '/medi-lab',
      port: 3001,
      authRequired: true,
      excludePaths: ['/medi-lab/login', '/medi-lab/api/auth', '/medi-lab/_next']
    },
    'aviation-hubspace': {
      loginPath: '/aviation-hubspace/login',
      basePath: '/aviation-hubspace',
      port: 3002,
      authRequired: true,
      excludePaths: ['/aviation-hubspace/login', '/aviation-hubspace/api/auth', '/aviation-hubspace/_next', '/aviation-hubspace/dashboard']
    },
    'safe-aq': {
      loginPath: '/safe-aq/login',
      basePath: '/safe-aq',
      port: 3003,
      authRequired: true,
    },
    'company-intranet': {
      loginPath: '/login',
      basePath: '/',
      port: 3000,
      authRequired: false,
      excludePaths: ['/login', '/api/auth', '/_next']
    }
  }
});

export default middleware;

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
}; 