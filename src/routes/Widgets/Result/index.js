import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/result',
  title: 'Results page',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
