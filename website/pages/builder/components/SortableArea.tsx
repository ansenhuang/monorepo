import React, { useState } from 'react';
import styled from 'styled-components';
import produce from 'immer';
import ReactSortable from '@axe/sortable';
import { useAtomState } from '@axe/context';
import { Empty, Tooltip } from 'antd';
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import { cloneDeepWith } from 'lodash';
import { pageSchemaState, selectedNodeState } from '../atoms';
import { buildNodeSchema, getTargetFromTree, getUuid } from '../helpers';
import type { PageSchema, NodeSchema } from '../types';

const SortableList = styled(ReactSortable)`
  overflow: auto;
  position: relative;
  ${({ items }) => (items.length === 0 ? 'min-height: 50px;' : '')};

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
  margin: 2px;
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
const SortableItemAction = styled.div<{
  show: boolean;
}>`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100;
  display: ${({ show }) => (show ? 'flex' : 'none')};
  font-size: 14px;
  color: #fff;
  border-radius: 0 0 0 2px;
  background-color: #008cff;

  span {
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;

export interface SortableAreaProps {}

const SortableArea: React.FC<SortableAreaProps> = () => {
  const [pageSchema, setPageSchema] = useAtomState(pageSchemaState);
  const [selectedNodeStore, setSelectedNode] = useAtomState(selectedNodeState);
  const [hoverNode, setHoverNode] = useState<NodeSchema | null>(null);

  const selectedNode = selectedNodeStore?.node;

  const updatePageSchema = (handler: (draft: PageSchema) => void) => {
    const nextPageSchema = produce(pageSchema, handler);
    setPageSchema(nextPageSchema);
  };
  const setItems = (newItems: NodeSchema[], paths: string[]) => {
    let nextSelectedNodeStore;
    const nextItems = newItems.map((item, index) => {
      // 新增的节点
      if (item.unmounted) {
        nextSelectedNodeStore = { node: item, paths: [...paths, String(index)] };
      }

      return {
        ...item,
        unmounted: false,
      };
    });

    updatePageSchema((draftSchema) => {
      const target = getTargetFromTree(draftSchema, paths);
      if (target) {
        const { current, key } = target;
        current[key] = nextItems;
      } else {
        console.warn('节点路径错误，无法更新目标节点', paths);
      }
    });

    // 如果是新增的则选中
    if (nextSelectedNodeStore) {
      setSelectedNode(nextSelectedNodeStore);
    }
  };

  const handleItemClick = (item: NodeSchema, paths: string[]) => {
    setSelectedNode({ node: item, paths });
  };
  const handleItemOver = (item: NodeSchema) => {
    if (item.key !== hoverNode?.key) {
      setHoverNode(item);
    }
  };
  const handleItemOut = (item: NodeSchema) => {
    setHoverNode(null);
  };
  const handleItemDelete = (paths: string[]) => {
    updatePageSchema((draftSchema) => {
      const target = getTargetFromTree(draftSchema, paths);
      if (target) {
        const { current, key } = target;
        if (Array.isArray(current)) {
          current.splice(+key, 1);
        }
      } else {
        console.warn('节点路径错误，无法更新目标节点', paths);
      }
    });
    setSelectedNode(null);
  };
  const handleItemCopy = (paths: string[]) => {
    updatePageSchema((draftSchema) => {
      const target = getTargetFromTree(draftSchema, paths);
      if (target) {
        const { current, key } = target;
        if (Array.isArray(current)) {
          const cloneItem = cloneDeepWith(current[+key], (v, k) => {
            if (k === 'key') {
              return v.split('_')[0] + '_copy_' + getUuid();
            }
          });
          current.splice(+key + 1, 0, cloneItem);
        }
      } else {
        console.warn('节点路径错误，无法更新目标节点', paths);
      }
    });
  };

  const renderSortable = (schema: PageSchema | NodeSchema, paths: string[]) => {
    const { key, name, children } = schema;

    if (children == null) {
      return null;
    }

    const isPage = key === pageSchema.key;
    const childrenArray = Array.isArray(children) ? children : [children];
    const getItemPaths = (index: number) => {
      return [...paths, 'children'].concat(Array.isArray(children) ? [String(index)] : []);
    };

    return (
      <SortableList
        group={{
          name,
          put: true,
        }}
        animation={150}
        style={{ minHeight: isPage ? '100%' : '' }}
        items={childrenArray}
        setItems={(newItems: any[]) => setItems(newItems, [...paths, 'children'])}
        cloneItem={(item: any) => buildNodeSchema(item)}
      >
        {childrenArray.map((item, index) => {
          const itemPaths = getItemPaths(index);
          return (
            <SortableItem
              key={item.key}
              hover={item.key === hoverNode?.key}
              selected={item.key === selectedNode?.key}
              onClickCapture={() => handleItemClick(item, itemPaths)}
              onMouseOverCapture={() => handleItemOver(item)}
              onMouseOutCapture={() => handleItemOut(item)}
            >
              {/* 遮罩层，组织原子组件事件触发 */}
              {!item.children && <SortableItemLayer />}
              {/* 操作栏 */}
              <SortableItemAction show={item.key === selectedNode?.key}>
                <Tooltip title="复制">
                  <CopyOutlined onClick={() => handleItemCopy(itemPaths)} />
                </Tooltip>
                <Tooltip title="删除">
                  <DeleteOutlined onClick={() => handleItemDelete(itemPaths)} />
                </Tooltip>
              </SortableItemAction>
              {/* 节点渲染 */}
              {item.Component ? (
                item.type !== 'builder' ? (
                  <item.Component
                    children={item.children && renderSortable(item, itemPaths)}
                    {...item.props}
                  />
                ) : (
                  <item.Component
                    schema={item}
                    paths={itemPaths}
                    updatePageSchema={updatePageSchema}
                    renderSortable={renderSortable}
                  />
                )
              ) : (
                <Empty
                  style={{ margin: 0, padding: 10 }}
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={`[${item.name}]组件不存在`}
                />
              )}
            </SortableItem>
          );
        })}
      </SortableList>
    );
  };

  return renderSortable(pageSchema, []);
};

export default SortableArea;
