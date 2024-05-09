import { createRoute } from '@/utils/core';
import { P404 } from 'components/Pages';

const routesConfig = (app) => ({
  title: 'Page not found',
  component: P404,
});

export default (app) => createRoute(app, routesConfig);
