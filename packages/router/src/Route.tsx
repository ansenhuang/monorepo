import React, { useContext } from 'react';
import { RouterContext } from './core';

export interface RouteProps {
  path: string;
  children?: React.ReactElement<any, any> | null;
}

const Route: React.FC<RouteProps> = ({ path, children }) => {
  const { path: contextPath } = useContext(RouterContext);
  if (path !== contextPath) {
    return null;
  }
  return children || null;
};

export default Route;
