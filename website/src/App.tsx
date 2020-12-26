import React, { Suspense } from 'react';
import { Router, Route } from '@axe/router';
import routes from 'src/constants/routes';
import './App.css';

const App = () => {
  return (
    <Router>
      {routes.map(({ props: { path, Component, ...restProps } }) => (
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
