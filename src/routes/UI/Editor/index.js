import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/editor',
  title: 'Rich text',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
