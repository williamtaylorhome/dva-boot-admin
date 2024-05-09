import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/modal',
  title: 'Modal window',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
