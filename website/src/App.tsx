import React, { lazy, Suspense } from 'react';
import { Router, Route } from './router';

const pages = [
  {
    path: '/',
    Component: lazy(() => import('./pages/app')),
  },
  {
    path: '/package',
    Component: lazy(() => import('./pages/package')),
  },
];

const App = () => {
  return (
    <Router>
      {pages.map(({ path, Component, ...restProps }) => (
        <Route key={path} path={path} {...restProps}>
          <Suspense fallback={null}>
            <Component />
          </Suspense>
        </Route>
      ))}
    </Router>
  );
};

export default App;
