import React from 'react';
import dva, { dynamic, router } from 'dva';
import createLoading from 'dva-loading';
import { createHashHistory } from 'history';
import request from 'cmn-utils/lib/request';
import createRoutes from '@/routes';
import 'assets/styles/index.less';
import config from './config';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';
import { homepage } from '../package.json';
import * as serviceWorker from './serviceWorker';

const { Router } = router;

// -> initialization
const app = dva({
  history: createHashHistory({
    basename: homepage.startsWith('/') ? homepage : ''
  })
});

// -> plugin
app.use(createLoading());
app.use({ onError: config.exception.global });

// -> Request
request.config(config.request);

// Use mock data
require('./__mocks__');
// -> Developer mock data
// if (process.env.NODE_ENV === 'development') {
//   require('./__mocks__');
// }
// -> loading
dynamic.setDefaultLoadingComponent(() => config.router.loading);

// -> Register the global model
app.model(require('./models/global').default);

// -> Initialize the route
app.router(({ history, app }) => (
  <ConfigProvider locale={zh_CN}>
    <Router history={history}>{createRoutes(app)}</Router>
  </ConfigProvider>
));

// -> Start
app.start('#root');

// export global
export default {
  app,
  store: app._store,
  dispatch: app._store.dispatch
};

// If you want it to be available offline, use register() instead of unregister(). It may bring some problems like caching, etc
// You can learn more about this from https://bit.ly/CRA-PWA
serviceWorker.unregister();
