import React from 'react';
import styled from 'styled-components';
// import produce from 'immer';
// import { Tabs, Empty } from 'antd';
import { useAtomState } from '@axe/context';
import { pageSchemaState, selectedNodeState } from '../atoms';
// import { getTargetFromTree } from '../helpers';
import type { NodeSchema } from '../types';

const Tree = styled.div`
  margin-left: -20px;
`;
const TreeItem = styled.div`
  font-size: 12px;
  color: #666;
  text-indent: 10px;
  line-height: 28px;
  border-left: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  cursor: grab;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const OutlineTree: React.FC = () => {
  const [pageSchema, setPageSchema] = useAtomState(pageSchemaState);
  // const [selectedNodeStore] = useAtomState(selectedNodeState);

  const renderItem = (children: NodeSchema | NodeSchema[], level: number): React.ReactNode => {
    if (Array.isArray(children)) {
      return children.map((child) => renderItem(child, level));
    } else {
      return (
        <div style={{ paddingLeft: 20 }}>
          <TreeItem>
            {children.label} ({children.key})
          </TreeItem>
          {children.children && renderItem(children.children, level + 1)}
        </div>
      );
    }
  };

  return <Tree>{renderItem(pageSchema.children, 0)}</Tree>;
};

export default OutlineTree;
