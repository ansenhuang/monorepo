import React, { useState } from 'react';
import styled from 'styled-components';
import produce from 'immer';
import ReactSortable from '@axe/sortable';
import { useAtomState } from '@axe/context';
import { pageSchemaState, selectedNodeState } from '../atoms';
import { isPageSchema, buildNodeSchema } from '../helpers';
import type { PageSchema, NodeSchema } from '../types';

const SortableList = styled(ReactSortable)`
  min-height: 50px;
  overflow: auto;
  position: relative;

  &::after {
    content: '请拖入组件';
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${({ items }) => (items.length > 0 ? 0 : 'inherit')};
    color: #999;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border: ${({ items }) => (items.length > 0 ? 0 : '1px')} dashed #666;
    box-shadow: inset 0 0 8px 0 #ccc;
  }
`;
const SortableItem = styled.div<{
  hover: boolean;
  selected: boolean;
}>`
  margin: 10px;
  position: relative;
  z-index: 1;
  ${({ selected }) => (selected ? 'box-shadow: 0 0 0 2px #008cff;' : '')}
  ${({ hover }) => (hover ? 'outline: 1px dashed #008cff;' : '')}
`;
const SortableItemLayer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  cursor: grab;
`;

export interface SortableAreaProps {}

const SortableArea: React.FC<SortableAreaProps> = () => {
  const [pageSchema, setPageSchema] = useAtomState(pageSchemaState);
  const [selectedNode, setSelectedNode] = useAtomState(selectedNodeState);
  const [hoverNode, setHoverNode] = useState<NodeSchema | null>(null);

  const setItems = (newItems: NodeSchema[], paths: string[]) => {
    const nextPageSchema = produce(pageSchema, (draftSchema) => {
      const newPaths = [...paths];
      const lastPath = newPaths.pop();
      let current: any = draftSchema;
      let key = newPaths.shift();
      while (current && key) {
        current = current[key];
        key = newPaths.shift();
      }
      if (lastPath && newPaths.length === 0) {
        // 找到目标节点
        current[lastPath] = newItems;
      } else {
        // 未找到目标节点
        console.warn('节点路径错误，无法更新目标节点', paths);
      }
    });
    setPageSchema(nextPageSchema);
  };

  const handleItemClick = (item: NodeSchema) => {
    setSelectedNode(item);
  };
  const handleItemOver = (item: NodeSchema) => {
    if (item.key !== hoverNode?.key) {
      setHoverNode(item);
    }
  };
  const handleItemOut = (item: NodeSchema) => {
    setHoverNode(null);
  };

  const renderSortable = (schema: PageSchema | NodeSchema, paths: string[]) => {
    const { name, children } = schema;
    const isPage = isPageSchema(schema);
    const currentPaths = [...paths, 'children'];

    if (children == null) {
      return null;
    }

    return (
      <SortableList
        group={{
          name,
          put: true,
        }}
        animation={150}
        style={{ minHeight: isPage ? '100%' : '' }}
        items={children}
        setItems={(newItems: any[]) => setItems(newItems, currentPaths)}
        cloneItem={(item: any) => buildNodeSchema(item)}
      >
        {children.map((item, index) => (
          <SortableItem
            key={item.key}
            hover={item.key === hoverNode?.key}
            selected={item.key === selectedNode?.key}
            onClickCapture={() => handleItemClick(item)}
            onMouseOverCapture={() => handleItemOver(item)}
            onMouseOutCapture={() => handleItemOut(item)}
          >
            {!item.children && <SortableItemLayer />}
            {item.Component && (
              <item.Component
                children={item.children && renderSortable(item, [...currentPaths, String(index)])}
                {...item.props}
              />
            )}
          </SortableItem>
        ))}
      </SortableList>
    );
  };

  return renderSortable(pageSchema, []);
};

export default SortableArea;
