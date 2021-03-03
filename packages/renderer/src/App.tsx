import { divide } from 'lodash';
import React from 'react';

interface AppProps {
  schema: any;
}

const App: React.FC<AppProps> = ({ schema }) => {
  const { nodes } = schema;

  return (
    <div>
      {nodes.map((node: any) => (
        <div key={node.key}>{node.key}</div>
      ))}
    </div>
  );
};

export default App;
