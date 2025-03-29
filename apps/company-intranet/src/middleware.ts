import { createGatewayMiddleware } from '@repo/ui/middleware/index';

const middleware = createGatewayMiddleware({
  defaultApp: 'company-intranet',
  apps: {
    'medi-lab': {
      loginPath: '/login',
      basePath: '',
      port: 3001,
      authRequired: true,
      excludePaths: ['/login']
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
      excludePaths: ['/login']
    }
  }
});

export default middleware;

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
}; 