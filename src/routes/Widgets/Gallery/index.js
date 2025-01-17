import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/gallery',
  title: 'Gallery',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
