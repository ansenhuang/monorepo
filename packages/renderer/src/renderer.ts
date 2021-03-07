import { createElement } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import RenderEngine from './RenderEngine';
import { materialsStore } from './store';
import { getDOMElement } from './utils';

import type { PageSchema, BootstrapParams } from './types';

export const bootstrap = (params: BootstrapParams) => {
  const { materials } = params;
  Object.entries(materials).forEach(([key, Component]) => {
    materialsStore.set(key, Component);
  });
};

export const mount = (container: string | Element, schema: PageSchema) => {
  const el = getDOMElement(container);
  el && render(createElement(RenderEngine, { schema }), el);
};

export const unmount = (container: string | Element) => {
  const el = getDOMElement(container);
  el && unmountComponentAtNode(el);
};
