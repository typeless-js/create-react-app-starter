# CRA starter for Typeless


Starter based on [Create React App](https://github.com/facebook/create-react-app).  


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
  - A very simple implementation with routing and redux. No need for `react-router`!
  - Dynamic configuration. [`RouteResolver`](blob/master/src/components/RouteResolver.tsx) scans all modules and loads all routes automatically.
  - Example `RouteConfig`. Some routes are only for the authenticated user, and some routes are only for the anonymous user. Feel free to extend this functionality depending on your needs.
- Lazy modules
  - Features `login`, `sample1`, `sample2` are dynamically loaded with `React.lazy`.
  - A loader is visible during lazy loading.
- Example redux form.
  - [`form`](blob/master/src/form/createForm.ts) contains a custom library for Redux Form integration. This is WIP and probably will be extracted to a separate library.



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


## Licence
MIT


