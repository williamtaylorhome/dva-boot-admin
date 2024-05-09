import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/banner',
  title: 'Banner management',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
