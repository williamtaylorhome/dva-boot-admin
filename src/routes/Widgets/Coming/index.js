import React from 'react';
import { createRoute } from '@/utils/core';
import { Coming } from 'components/Pages';

const routesConfig = app => ({
  path: '/coming',
  title: 'Coming Soon',
  component: () => (
    <Coming
      title="Coming soon"
      value={Date.now() + 1000 * 60 * 60 * 24 * 2}
    />
  )
});

export default app => createRoute(app, routesConfig);
