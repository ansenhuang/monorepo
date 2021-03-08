import React, { useMemo } from 'react';
import NotFound from './NotFound';

import type { NodeSchema } from '../types';
import type { RenderEngineProps } from './RenderEngine';

export interface RenderNodeProps extends Omit<RenderEngineProps, 'schema'> {
  node: NodeSchema;
}

const RenderNode: React.FC<RenderNodeProps> = ({ node, ...restProps }) => {
  const { materials, processor } = restProps;

  /* eslint-disable react-hooks/exhaustive-deps */
  const element = useMemo(() => {
    const targetMaterial = materials.find((material) => material.name === node.name);

    if (targetMaterial == null) {
      // 未找到对应的组件
      return <NotFound node={node} />;
    }

    if (targetMaterial.Component == null) {
      // 组件为空
      // todo: 远程加载失败处理
      return null;
    }

    const { props, slots } = node;
    const { Component } = targetMaterial;
    const nodeProps: Record<string, any> = { ...props };

    if (slots) {
      Object.entries(slots).forEach(([slotKey, subNodes]) => {
        let children: React.ReactNode;
        if (Array.isArray(subNodes)) {
          children = subNodes.map((subNode) => (
            <RenderNode key={subNode.key} node={subNode} {...restProps} />
          ));
        } else {
          children = <RenderNode key={subNodes.key} node={subNodes} {...restProps} />;
        }
        nodeProps[slotKey] = children;
      });
    }

    // 渲染组件
    // todo: 组件渲染报错处理
    return <Component {...nodeProps} />;
  }, [node]);

  return processor ? processor(node, element) : element;
};

export default RenderNode;
