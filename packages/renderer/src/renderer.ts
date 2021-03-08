import React from 'react';
import ReactDOM from 'react-dom';
import RenderEngine from './components/RenderEngine';
import { getDOMElement } from './utils';

import type { MaterialSchema } from './types';
import type { RenderEngineProps } from './components/RenderEngine';

class Renderer {
  private materials: MaterialSchema[] = [];

  bootstrap(params: { materials?: MaterialSchema[] }) {
    const { materials } = params;

    if (materials) {
      this.registerMaterials(materials);
    }
  }

  mount(container: string | Element, props: Omit<RenderEngineProps, 'materials'>) {
    const el = getDOMElement(container);
    if (el) {
      ReactDOM.render(
        React.createElement(RenderEngine, {
          ...props,
          materials: this.materials,
        }),
        el,
      );
    }
  }

  unmount(container: string | Element) {
    const el = getDOMElement(container);
    if (el) {
      ReactDOM.unmountComponentAtNode(el);
    }
  }

  registerMaterials(materials: MaterialSchema[]) {
    this.materials = materials;
  }
}

export default Renderer;
