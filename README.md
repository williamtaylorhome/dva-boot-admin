<p align="center">
    <img alt="dva-boot-admin" src="https://user-images.githubusercontent.com/1697158/49214902-8f888180-f402-11e8-8207-84d5cdf9d9bf.png" width="140">
</p>
<h1 align="center">DVA Boot Admin</h1>
<h3 align="center">:lemon: :tangerine: :cherries: :cake: :grapes: :watermelon: :strawberry: :corn: :peach: :melon:</h3>

Based on the most mature technology system of the React ecosystem, an out-of-the-box back-end management system is built. The framework contains some unique custom components, as well as many third-party components that have been well-received and well-known. We hope that people who use it can quickly and stably develop robust, beautiful and easy-to-use web applications.


## Table of Contents
* [Feature](#feature)
* [Project Structure](#structure)
* [Usage](#usage)
* [Document]
  - [Get Start]
  - [Configuration]
  - [Use ModelEnhance]
  - [Use PageHelper]
  - [Components]
  - [API Mock]
  - [Building for Production]
  - [FAQs]
* [Gallery](#gallery)
* [End](#end)

## Feature
- **Encapsulate the data flow of the dva framework**,Simple requests can be defined without being defined in model and service.
- **Encapsulated api mock**,Can develop front-end functions independently of the background.
- **Encapsulated paging request**,Simplify and standardize paging logic.
- **Encapsulated fetch**,The best fetch tools.
- **Routing on demand loading**,First screen loading super fast.
- **Wrapped antd component**,Expanded many useful widgets.
- **Fractal project structure**,No need to distract other modules during development, to achieve minimum coupling.
- Build**2.09 MB**after gzip,less than **1 MB** general.
- Global exception handling, global request interception

## Structure
```
.
├── public                   # Static public assets (not imported anywhere in source code)
├── templates                # Template file prepared for code generation
├── src                      # Application source code
│   ├── index.js             # Main HTML page container for app
│   ├── config.js            # Global configuration
│   ├── components           # Global Reusable Components
│   ├── layouts              # Components that dictate major page structure
│   │   ├── BasicLayout      # Basic page structure,configured in the route
│   │   └── OtherLayout      # Other layout,
│   ├── routes               # Main route definitions and async split points
│   │   ├── index.js         # Main Route configured and async split points
│   │   ├── Home             # Fractal route
│   │   │   ├── index.js     # Route definitions and async split points
│   │   │   ├── assets       # Assets required to render components
│   │   │   ├── components   # Presentational React Components
│   │   │   ├── model        # dva model
│   │   │   ├── service      # dva service
│   │   │   └── routes **    # Fractal sub-routes (** optional)
│   │   └── Login            # Fractal route
│   │       ├── index.js     # Route definitions and async split points
│   │       ├── assets       # Assets required to render components
│   │       ├── components   # Presentational React Components
│   │       ├── model        # dva model
│   │       ├── service      # dva service
│   │       └── routes **    # Fractal sub-routes (** optional)
│   ├── utils                # Tools 
│   └── assets               # Global assets 
│           ├── fonts        # Fonts & Icons
│           ├── images       # Common Images
│           └── styles       # Global styles
```

## Usage

``` javascript
$ git clone 
$ cd dva-boot-admin
// Installation
$ yarn
// Serves your app and open localhost:3000
$ yarn start
// Builds the application
$ yarn build
// Builds the application of graphical analysis
$ yarn build --analyze
```

## Compatibility

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- | 
| >= IE10 | last 2 versions | last 2 versions | last 2 versions | last 2 versions

## End

Welcome everyone to ask questions and PR