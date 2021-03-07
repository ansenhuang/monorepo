import React from 'react';
import { materialsStore } from './store';

import type { PageSchema, NodeSchema } from './types';

export interface RenderEngineProps {
  schema: PageSchema;
}

const renderNode = (node: NodeSchema) => {
  const { key, name, props, slots } = node;
  const NodeComponent = materialsStore.get(name);
  const nodeProps: Record<string, any> = { key, ...props };

  if (NodeComponent && slots) {
    Object.entries(slots).forEach(([slotKey, subNodes]) => {
      let children: React.ReactNode;
      if (Array.isArray(subNodes)) {
        children = subNodes.map((subNode) => renderNode(subNode));
      } else {
        children = renderNode(subNodes);
      }
      nodeProps[slotKey] = children;
    });
  }

  return NodeComponent ? (
    <NodeComponent {...nodeProps} />
  ) : (
    <div key={key} style={{ textAlign: 'center', lineHeight: 3, backgroundColor: '#ccc' }}>
      <span style={{ color: '#f50' }}>{name}</span>
      组件不存在
    </div>
  );
};

const RenderEngine: React.FC<RenderEngineProps> = ({ schema }) => {
  const { nodes } = schema;

  return <div style={{ backgroundColor: '#eee' }}>{nodes.map((node) => renderNode(node))}</div>;
};

export default RenderEngine;
