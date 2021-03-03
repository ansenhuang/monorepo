import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const renderer = {
  mounted: (selector: string, schema: any) => {
    const el = document.querySelector(selector);
    if (el) {
      ReactDOM.render(React.createElement(App, { schema }), el);
    }
  },
};

export default renderer;
