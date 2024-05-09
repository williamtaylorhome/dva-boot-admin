# Build Package deployment

> `yarn run build` or `npm run build`

v1.2.0 after，Based on the latest rpackaging and deploymentscript v2

## Pack size is too large & Disable SourceMap

In your '.env' file：
```js
GENERATE_SOURCEMAP=false
```

## Release path

Set the value of 'homepage' in 'package.json', such as' dva-boot-admin 'folder on the server：
```json
"homepage": "/dva-boot-admin"
```
If published to the server with the directory for
```json
"homepage": "/"
```
Using relative paths
```json
"homepage": "."
```
Misconfigured assets may not be loaded

## Use `browser history`，Additional Settings for `nginx`

When using browser history, you need to set all pages to point to index.html under 'nginx.conf'
```bash
server {
  // ...
  location / {
    index  index.html;
    # If deployed to /dva-boot-admin
    # try_files $uri $uri/ /dva-boot-admin/index.html;
    # If deployed to the root directory
    try_files $uri $uri/ /index.html;
  }
  // ...
}
```

## How to configure reverse proxy nginx (production)

1. Open the nginx configuration file 'nginx.conf' and add it under 'server' (according to your project Settings).：
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
Find out more configurations yourself...

2. Restart nginx