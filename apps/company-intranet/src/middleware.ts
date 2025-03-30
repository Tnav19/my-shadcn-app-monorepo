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
    'safe-aq': {
      loginPath: '/safe-aq/login',
      basePath: '/safe-aq',
      port: 3002,
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