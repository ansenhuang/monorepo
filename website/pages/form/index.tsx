import React from 'react';

import BasicUsage from './examples/BasicUsage';

const Page = () => {
  return (
    <div
      style={{
        background: 'linear-gradient(to bottom, rgb(244,215,201) 0%,rgb(244,226,201) 100%)',
        overflow: 'hidden',
      }}
    >
      <h1>Form examples</h1>
      <h2>Basic Usage</h2>
      <BasicUsage />
    </div>
  );
};

export default Page;
