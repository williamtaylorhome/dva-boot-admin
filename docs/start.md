# How to start

It is best to learn about it first[dva.js](https://github.com/dvajs/dva/blob/master/README.md) and create-react-app.

## How to get a clean engineering structure

0. **routers** The directory is the page folder, ** Routes ** index.js is the page configuration file. Except for this file, other files are optional.** Blank **, is an empty page example, we can copy this quickly generate a route page. ** Login **, is the login page; ** register ** is the registration page.
1. Leave the page we need and delete other extra folders.
2. Open the ** index.js ** under ** Routes **, we have to configure the route page here:
``` js
import {createRoutes} from '@/utils/core';
import BasicLayout from '@/layouts/BasicLayout';
import UserLayout from '@/layouts/UserLayout';
import NotFound from './Pages/404';
import Login from './Login';
import Register from './Register';
import Blank from './Blank';

const routesConfig = (app) => ([
  {
    path: '/sign',              // url
    title: 'Log in',
    indexRoute: '/sign/login',  // Default route
    component: UserLayout,      // Page Layout
    childRoutes: [
      Login(app),               // Sub -routing page
      Register(app),
      NotFound()                // This should be placed at the bottom, and when all routes are not matched, they will enter this page
    ]
  }, {
    path: '/',
    title: 'System center',
    component: BasicLayout,
    indexRoute: '/blank', // Default route
    childRoutes: [
      Blank(app),
      NotFound(), // This should be placed at the bottom, and when all routes are not matched, they will enter this page
    ]
  }
]);

export default app => createRoutes(app, routesConfig);
```

## Create a new page

First build a routing folder under the `src/routes`, which can be imitated` src/routes/blank`. The route page consists of four parts, ** Components, Model, Service, Index.js **,
### components view page

This part is composed of ** Index.js ** and the style of the page.
``` js
@connect() // dva connect
export default class extends BaseComponent {
  render() {
    return (
      <Layout className="full-layout page blank-page">
        <Content className={style.className}>blank page</Content>
      </Layout>
    );
  }
}
```
It is best to use the nested structure in the example of the outer layer, `layout> Content`, and set a self-` className` or `` Blank-Page` for each route page, so we write this page specific style of this page When you start writing from this style, you will not conflict with other routing pages.

### model Logic page（dva model）- Must

Model is the DVAJS Model. Recommended writing
```js
import modelEnhance from '@/utils/modelEnhance';

export default modelEnhance({
  namespace: 'blank',
});
```
`Modlenhance` is encapsulated by the framework, you can simplify the writing of ** dvajs **. After that, it will be specifically introduced.

### service Interface definition (dva service) - Must

Define our interface API here. If there is no, you can not write

### index.js Define the child routing -must

```js
const routesConfig = app => ({
  path: '/blank',                // url
  title: 'blank page', // page title
  component: dynamicWrapper(app, [import('./model')], () => import('./components')) // If there is no model, you can not write import('./model')
});
```

## Register a new page to global routing

Just add our newly written page to index.js under the indeers.

## Configure route to the left menu

[`Src/__mocks __/User.js`] (https://github.com/lanif-dva-boot-dmin/blob/src/_mocks__SR.js #L41) Increase the routing page we write
