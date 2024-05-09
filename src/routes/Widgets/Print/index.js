import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/print',
  title: 'print',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
