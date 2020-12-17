import React, { lazy, Suspense, useState, useEffect } from 'react';
import { RouterContext } from './router';

interface Pages {
  [pathname: string]: React.LazyExoticComponent<() => JSX.Element>;
}
const pages: Pages = {
  '/': lazy(() => import('./pages/app')),
  '/package': lazy(() => import('./pages/package')),
};

const App = () => {
  const [pathname, setPathname] = useState(window.location.pathname);
  const Page = pages[pathname];

  useEffect(() => {
    const onHistoryChange = (e: PopStateEvent) => {
      setPathname(window.location.pathname);
    };
    window.addEventListener('popstate', onHistoryChange);
    return () => {
      window.removeEventListener('popstate', onHistoryChange);
    };
  }, []);

  return (
    <RouterContext.Provider value={{ pathname, setPathname }}>
      <Suspense fallback={null}>
        {Page ? <Page /> : <h1 style={{ textAlign: 'center' }}>404</h1>}
      </Suspense>
    </RouterContext.Provider>
  );
};

export default App;
