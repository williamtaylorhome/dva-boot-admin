import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/animations',
  title: 'animation',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
