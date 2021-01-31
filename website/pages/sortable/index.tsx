import React from 'react';

import SimpleList from './examples/SimpleList';
import CloningList from './examples/CloningList';
import SharedList from './examples/SharedList';

import './examples.css';

const Page = () => {
  return (
    <div
      style={{
        background: 'linear-gradient(to bottom, rgb(244,215,201) 0%,rgb(244,226,201) 100%)',
        overflow: 'hidden',
      }}
    >
      <h1>Sortable examples</h1>
      <h2>Simple list example</h2>
      <SimpleList />
      <h2>Cloning list example</h2>
      <CloningList />
      <h2>Shared list example</h2>
      <SharedList />
    </div>
  );
};

export default Page;
