import React, { lazy } from 'react';
// import type { RouteProps } from '@axe/router';
type RouteProps = any;

interface RouteItemProps extends Omit<RouteProps, 'children'> {
  Component: React.ElementType;
}
interface RouteItem {
  name: string;
  props: RouteItemProps;
}

const routes: Array<RouteItem> = [
  {
    name: '应用导航',
    props: {
      path: '/',
      Component: lazy(() => import('src/pages/app')),
    },
  },
  {
    name: '全局状态',
    props: {
      path: '/context',
      Component: lazy(() => import('src/pages/context')),
    },
  },
];

export default routes;