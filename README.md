# CRA starter for Typeless


Starter based on [Create React App](https://github.com/facebook/create-react-app).  

<!-- Markdown snippet -->
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/typeless-js/create-react-app-starter)

### Quick Start

```
# install dependencies
yarn

# start in dev mode
yarn start

# create production build
yarn build
```

## Features
- User state management:
  - Login page.
  - Logout button.
  - Loading the initial user instance on the page load. Routing is ignored if the initial data is not loaded. Similar to `onEnter` functionality from old `react-router`.
- Routing
  - Implemented with `typeless-router`
  - Dynamic configuration. [`RouteResolver`](/src/components/RouteResolver.tsx) scans all modules and loads all routes automatically.
  - Example `RouteConfig`. Some routes are only for the authenticated user, and some routes are only for the anonymous user. Feel free to extend this functionality depending on your needs.
- Lazy modules
  - Features `login`, `sample1`, `sample2` are dynamically loaded with `React.lazy`.
  - A loader is visible during lazy loading.
- Example form.
  - Implemented with `typeless-form`



## Scripts
`yarn run start`  
Start in development mode.

`yarn run build`  
Create a production build.

`yarn run prettier`  
Auto-format code with prettier.

`yarn run tsc`  
Check for TypeScript errors.

`yarn run lint`  
Check for tslint errors.


## Blueprints
Install [plop](https://www.npmjs.com/package/plop) `npm i -g plop`.  

Following blueprints are available:
- `feature` - create a blueprint for a new feature. Includes: interface, module, example component.


## Licence
MIT


