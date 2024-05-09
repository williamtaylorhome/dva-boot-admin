import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/mask',
  title: 'shield',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
