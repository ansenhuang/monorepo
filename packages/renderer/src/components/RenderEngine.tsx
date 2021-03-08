import React from 'react';
import RenderNode from './RenderNode';

import type { PageSchema, NodeSchema, MaterialSchema } from '../types';

export interface RenderEngineProps {
  schema: PageSchema;
  materials: MaterialSchema[];
  processor?: (node: NodeSchema, element: React.ReactElement | null) => React.ReactElement | null;
}

const RenderEngine: React.FC<RenderEngineProps> = ({ schema, ...restProps }) => {
  const { nodes } = schema;
  const children = nodes.map((node) => <RenderNode key={node.key} node={node} {...restProps} />);
  return <>{children}</>;
};

export default RenderEngine;
