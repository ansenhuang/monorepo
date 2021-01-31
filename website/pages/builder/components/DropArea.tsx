import React from 'react';
import styled from 'styled-components';
import ReactSortable from '@axe/sortable';
import { useAtomState } from '@axe/context';
import { dropDataAtomState } from '../atoms';
import type { DropDataItem } from '../types';

const DropBox = styled(ReactSortable)`
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
    border: 1px dashed #666;
    box-shadow: inset 0 0 8px 0 #ccc;
  }
`;
const DropItem = styled.div`
  margin: 10px;
  border: 1px solid #eee;
  position: relative;
  z-index: 1;
`;
const DropLayer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  cursor: grab;
`;

export interface DropAreaProps {}

const rootName = `@@__ROOT__@@`;
const DropArea: React.FC<DropAreaProps> = () => {
  const [dropData, setDropData] = useAtomState(dropDataAtomState);

  const setItems = (newItems: DropDataItem[], parentItem?: DropDataItem) => {
    if (!parentItem) {
      setDropData(newItems);
    } else {
      parentItem.children = newItems;
      setDropData([...dropData]);
    }
  };
  const renderSortable = (name: string, items: DropDataItem[], parentItem?: DropDataItem) => (
    <DropBox
      group={{
        name,
        put: true,
      }}
      animation={150}
      style={{ minHeight: name === rootName ? '100%' : '' }}
      items={items}
      setItems={(newItems: any[]) => setItems(newItems, parentItem)}
      cloneItem={(item) => ({
        ...item,
        key: item.key + '_' + Date.now(),
        children: item.children ? [...item.children] : undefined,
      })}
    >
      {items.map((item) => (
        <DropItem key={item.key}>
          {!item.children && <DropLayer />}
          {item.Component && (
            <item.Component
              {...item.props}
              children={item.children && renderSortable(item.name, item.children, item)}
            />
          )}
        </DropItem>
      ))}
    </DropBox>
  );

  return renderSortable(rootName, dropData);
};

export default DropArea;
