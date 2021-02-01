import React, { useState } from 'react';
import styled from 'styled-components';
import ReactSortable from '@axe/sortable';
import { useAtomState } from '@axe/context';
import { pageDataAtomState, selectedDropItemAtomState } from '../atoms';
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
    border: ${({ items }) => (items.length > 0 ? 0 : '1px')} dashed #666;
    box-shadow: inset 0 0 8px 0 #ccc;
  }
`;
const DropItem = styled.div<{
  hover: boolean;
  selected: boolean;
}>`
  margin: 10px;
  position: relative;
  z-index: 1;
  ${({ selected }) => (selected ? 'box-shadow: 0 0 0 2px #008cff;' : '')}
  ${({ hover }) => (hover ? 'outline: 1px dashed #008cff;' : '')}
`;
const DropItemLayer = styled.div`
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
  const [pageData, setPageData] = useAtomState(pageDataAtomState);
  const [selectedItem, setSelectedItem] = useAtomState(selectedDropItemAtomState);
  const [hoverItem, setHoverItem] = useState<DropDataItem | null>(null);

  const setItems = (newItems: DropDataItem[], parentItem?: DropDataItem) => {
    if (!parentItem) {
      setPageData({
        ...pageData,
        children: newItems,
      });
    } else {
      parentItem.children = newItems;
      setPageData({ ...pageData });
    }
  };

  const handleItemClick = (item: DropDataItem) => {
    setSelectedItem(item);
  };
  const handleItemOver = (item: DropDataItem) => {
    if (item.key !== hoverItem?.key) {
      setHoverItem(item);
    }
  };
  const handleItemOut = (item: DropDataItem) => {
    setHoverItem(null);
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
        <DropItem
          key={item.key}
          hover={item.key === hoverItem?.key}
          selected={item.key === selectedItem?.key}
          onClickCapture={() => handleItemClick(item)}
          onMouseOverCapture={() => handleItemOver(item)}
          onMouseOutCapture={() => handleItemOut(item)}
        >
          {!item.children && <DropItemLayer />}
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

  return renderSortable(rootName, pageData.children);
};

export default DropArea;
