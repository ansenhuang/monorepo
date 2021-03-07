import React from 'react';

import type { NodeSchema } from '../types';

interface NotFoundProps {
  node: NodeSchema;
}

const NotFound: React.FC<NotFoundProps> = ({ node }) => {
  return (
    <div style={{ textAlign: 'center', lineHeight: 3, backgroundColor: '#ccc' }}>
      <span style={{ color: '#f50' }}>{node.name}</span>
      组件不存在
    </div>
  );
};

export default NotFound;
