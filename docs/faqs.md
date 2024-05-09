# FAQs

## columns.js Add custom events
For example, the default 'formItem: {}' is the 'Input' component of antd, which is the 'formItem: { type: 'select' }' is the Select drop-down component of antd：
```js
...
{
  title: 'Character name',
  name: 'roleName',
  formItem: {
    onKeyDown: e => console.log(e)
  }
},
...
```

## How to Configure a Proxy (Effective in the Development Environment)

When requesting the backend interface, we use the reverse proxy mode, which is set in 'src/setupProxy.js', see more settings[create-react-app v2](https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development#configuring-the-proxy-manually) and http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)
```js
app.use(
  proxy('/api', {
    target: 'http://192.168.202.12:8391',
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  })
);

// example fetch('/api/user/getDetail') -> 'http://192.168.202.12:8391/user/getDetail'

// Multiple can be configured, pay attention to the order, the largest range should be placed at the bottom,
app.use(
  proxy('/api/sub', {
    target: 'http://localhost:8080',
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  })
);
app.use(
  proxy('/api', {
    target: 'http://aaa:1000',
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  })
);
app.use(
  proxy('/xxx', {
    target: 'http://bbb:2000',
    changeOrigin: true,
    pathRewrite: {
      '^/xxx': ''
    }
  })
);
```

## How to Configure Reverse Proxy Nginx (Production)

1. Open the nginx configuration file 'nginx.conf', which has the same effect as above, and increase it under 'server'
```js
location /api/v1/ {
  proxy_pass http://192.168.202.11/v1/;
}

location /api/v2/ {
  proxy_pass http://192.168.202.12/v2/;
}

location /api/ {
  proxy_pass http://192.168.202.13/;
}
```
Find more configurations by yourself...

2. Reboot nginx

## No proxy, cross-domain background (not recommended)

Scenario 1: If the background settings are as follows (recommended)
```js
Access-Control-Allow-Origin *;
Access-Control-Allow-Credentials true // important
```
The foreground can send a request directly (there may be an options request) without changing the configuration

Scenario 2: If the background settings are as follows:
```js
Access-Control-Allow-Origin *;
```

If the configuration is not changed at the front desk, an error will be reported <font color="red">device:1 Failed to load http://localhost:8080/test: Response to preflight request doesn't pass access control check: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'. Origin 'http://localhost:3000' is therefore not allowed access.</font>


The foreground needs to change the configuration of 'request' in 'config.js'
```js
  request: {
    prefix: '/api',
    credentials: 'omit', // credentials Instead omit，fetch Default value
```
It should be OK to make a request, because it may not be a simple request and there will be an option

## Release path ([refer to 1.2.0 or later]）

> **Note: After 1.1.0 this configuration has been moved to the package.json publicPath changed to baseURL, starting with '/' and ending with no '/'**

When building the project, make sure to configure the correct 'publicPath' in the 'config-overrides.js', for example, in the 'demo' folder
```js
config.output.publicPath = '/demo'; // Follow the actual project settings
```
If published to the server in the following directory
```js
config.output.publicPath = '/'; // Follow the actual project settings
```
If the configuration is incorrect, the related resources may not be loaded

## Routing configuration at publish time

When using browser history, you need to set all pages to point to index.html under 'nginx.conf'
```bash
server {
  // ...
  location / {
    index  index.html;
    # If deployed to the /dva-boot-admin directory
    # try_files $uri $uri/ /dva-boot-admin/index.html;
    # If deployed to the root directory
    try_files $uri $uri/ /index.html;
  }
  // ...
}
```

## When sending a request using '$$.post, $$.get', etc., be careful to handle the reverse exception
Example:
```js
$$.get('url').then(resp => {
  // ...more      
}).catch(e => console.err(e)); // It's best to deal with the error
```
Because: 'afterResponse' in 'config.js' will throw an error again and we need to deal with it ourselves
