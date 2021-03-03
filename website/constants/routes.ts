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
      path: '/state',
      Component: lazy(() => import('src/pages/state')),
    },
  },
  {
    name: '依赖注入',
    props: {
      path: '/reflect',
      Component: lazy(() => import('src/pages/reflect')),
    },
  },
  {
    name: '拖拽交互',
    props: {
      path: '/sortable',
      Component: lazy(() => import('src/pages/sortable')),
    },
  },
  {
    name: '智能表单',
    props: {
      path: '/form',
      Component: lazy(() => import('src/pages/form')),
    },
  },
  {
    name: '页面搭建',
    props: {
      path: '/builder',
      Component: lazy(() => import('src/pages/builder')),
    },
  },
  {
    name: '页面渲染',
    props: {
      path: '/renderer',
      Component: lazy(() => import('src/pages/renderer')),
    },
  },
];

export default routes;
