import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/button',
  title: 'button',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
