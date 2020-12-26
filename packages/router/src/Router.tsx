import React, { useState, useEffect } from 'react';
import { getCurrentPath, RouterContext } from './core';

export interface RouterProps {}

const Router: React.FC<RouterProps> = ({ children }) => {
  const [path, setPath] = useState(getCurrentPath());

  useEffect(() => {
    // e: PopStateEvent
    const onHistoryChange = () => {
      setPath(getCurrentPath());
    };
    window.addEventListener('popstate', onHistoryChange);
    return () => {
      window.removeEventListener('popstate', onHistoryChange);
    };
  }, []);

  return <RouterContext.Provider value={{ path, setPath }}>{children}</RouterContext.Provider>;
};

export default Router;
