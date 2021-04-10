import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import produce from 'immer';
import { DownOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import ReactSortable from '@axe/sortable';
import { useAtomState } from '@axe/context';
import { pageSchemaState, hoverNodeState, selectedNodeState } from '../atoms';
import { getTargetFromTree, buildNodeSchema } from '../helpers';
import type { SortableEvent } from '@axe/sortable';
import type { PageSchema, NodeSchema } from '../types';

const Tree = styled.div`
  margin-left: -20px;
  color: #666;
`;
const SortableList = styled(ReactSortable)`
  padding-left: 20px;
`;
const SortableItem = styled.div<{
  visible?: boolean;
}>`
  border-left: 1px dashed #f0f0f0;
  color: ${({ visible }) => (visible ? 'inherit' : '#ccc')};
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0;
    border-bottom: 1px solid #f0f0f0;
  }
`;
const Text = styled.div<{
  hover?: boolean;
  selected?: boolean;
}>`
  display: flex;
  font-size: 12px;
  line-height: 28px;
  position: relative;
  border-bottom: 1px solid #f0f0f0;
  background-color: ${({ selected, hover }) =>
    selected ? 'rgba(224, 240, 255, 1)' : hover ? '#f0f0f0' : 'inherit'};

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 0;
    right: 0;
    height: 0;
    border-bottom: 1px solid #f0f0f0;
  }
`;
const TextLeft = styled.span<{
  closed?: boolean;
}>`
  transition: transform 0.15s;
  transform: rotate(${({ closed }) => (closed ? '-90' : '0')}deg);

  > span {
    width: 28px;
    cursor: pointer;
  }
`;
const TextCenter = styled.span`
  flex-grow: 1;
  cursor: grab;
`;
const TextRight = styled.div`
  > span {
    width: 28px;
    cursor: pointer;
  }
`;

interface MoveItemStore {
  newItems: NodeSchema[];
  paths: string[];
  index: number;
}

const OutlineTree: React.FC = () => {
  const [pageSchema, setPageSchema] = useAtomState(pageSchemaState);
  const [selectedNodeStore, setSelectedNode] = useAtomState(selectedNodeState);
  const [hoverNodeStore, setHoverNode] = useAtomState(hoverNodeState);
  const [closedItems, setClosedItems] = useState<string[]>([]);

  const selectedNode = selectedNodeStore?.node;
  const hoverNode = hoverNodeStore?.node;

  const memoStore = useMemo<{
    moveList: MoveItemStore[];
  }>(
    () => ({
      moveList: [],
    }),
    [],
  );

  const setItems = (newItems: NodeSchema[], paths: string[], e: SortableEvent) => {
    const isMove = e.type === 'add' && e.pullMode === true;
    const isRemove = e.type === 'remove';

    // 这里进行移动时会触发两次（移出删除 + 移入增加），由于是同步执行，单方面更新数据无效
    if (isMove || isRemove) {
      const { moveList } = memoStore;
      moveList.push({
        newItems,
        paths,
        index: (isMove ? e.newIndex : e.oldIndex) || 0,
      });

      if (moveList.length === 2) {
        const updateSchema = (target: any, moveItem: MoveItemStore) => {
          const { newItems: items, paths: itemPaths, index } = moveItem;
          if (target) {
            const { current, key } = target;
            if (current[key].length > items.length) {
              current[key].splice(index, 1);
            } else {
              current[key].splice(index, 0, items[index]);
            }
          } else {
            console.warn('节点路径错误，无法更新目标节点', itemPaths);
          }
        };
        const nextPageSchema = produce(pageSchema, (draftPageSchema) => {
          // 先取出引用节点，避免由于前置更新后导致paths路径不对
          const targetAdd = getTargetFromTree(draftPageSchema, moveList[0].paths);
          const targetRemove = getTargetFromTree(draftPageSchema, moveList[1].paths);
          // 基于引用节点执行数据更新
          updateSchema(targetAdd, moveList[0]);
          updateSchema(targetRemove, moveList[1]);
        });
        moveList.length = 0; // 数据更新后将缓存置空
        setPageSchema(nextPageSchema);
      }
      return;
    }

    // 正常的更新，一步到位
    const nextPageSchema = produce(pageSchema, (draftPageSchema) => {
      const target = getTargetFromTree(draftPageSchema, paths);
      if (target) {
        const { current, key } = target;
        current[key] = newItems;
      } else {
        console.warn('节点路径错误，无法更新目标节点', paths);
      }
    });
    setPageSchema(nextPageSchema);
  };

  const handleItemExpand = (node: NodeSchema, paths: string[]) => {
    const nextClosedItems = [...closedItems];
    const index = nextClosedItems.findIndex((key) => key === node.key);
    if (index === -1) {
      nextClosedItems.push(node.key);
    } else {
      nextClosedItems.splice(index, 1);
    }
    setClosedItems(nextClosedItems);
  };
  const handleItemOver = (item: NodeSchema, paths: string[]) => {
    if (item.key !== hoverNode?.key) {
      setHoverNode({ node: item, paths });
    }
  };
  const handleItemOut = (item: NodeSchema, paths: string[]) => {
    setHoverNode(null);
  };
  const handleItemSelected = (item: NodeSchema, paths: string[]) => {
    setSelectedNode({ node: item, paths });
  };
  const handleItemVisible = (item: NodeSchema, paths: string[]) => {
    const nextPageSchema = produce(pageSchema, (draftPageSchema) => {
      const target = getTargetFromTree(draftPageSchema, paths);
      if (target) {
        const { current, key } = target;
        if (current[key]) {
          current[key].visible = item.visible === false ? true : false;
        }
      } else {
        console.warn('节点路径错误，无法更新目标节点', paths);
      }
    });
    setPageSchema(nextPageSchema);
  };

  const renderSortable = (schema: PageSchema | NodeSchema, paths: string[]) => {
    const { name, accept, children } = schema as NodeSchema;

    if (children == null) {
      return null;
    }

    const childrenArray = Array.isArray(children) ? children : [children];

    return (
      <SortableList
        group={{
          name: 'outline_' + name,
          pull: true,
          put: accept == null ? true : accept,
        }}
        animation={150}
        draggable={'.' + SortableItem.styledComponentId}
        items={childrenArray}
        setItems={(newItems: any[], e) => setItems(newItems, [...paths, 'children'], e)}
        cloneItem={(item: any) => buildNodeSchema(item)}
      >
        {childrenArray.map((item, index) => {
          const itemPaths = [...paths, 'children'].concat(
            Array.isArray(children) ? [String(index)] : [],
          );

          return (
            <SortableItem
              key={item.key}
              visible={item.visible}
              style={{
                height: closedItems.includes(item.key) ? 29 : '',
              }}
            >
              <Text
                selected={selectedNode?.key === item.key}
                hover={hoverNode?.key === item.key}
                onMouseOverCapture={() => handleItemOver(item, itemPaths)}
                onMouseOutCapture={() => handleItemOut(item, itemPaths)}
              >
                {item.children && (
                  <TextLeft
                    closed={closedItems.includes(item.key)}
                    onClick={() => handleItemExpand(item, itemPaths)}
                  >
                    <DownOutlined />
                  </TextLeft>
                )}
                <TextCenter
                  style={{
                    paddingLeft: item.children ? 0 : 10,
                  }}
                  onClick={() => handleItemSelected(item, itemPaths)}
                >
                  {item.label} ({item.key})
                </TextCenter>
                <TextRight onClick={() => handleItemVisible(item, itemPaths)}>
                  {item.visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                </TextRight>
              </Text>
              {renderSortable(item, itemPaths)}
            </SortableItem>
          );
        })}
      </SortableList>
    );
  };

  return <Tree>{renderSortable(pageSchema, [])}</Tree>;
};

export default OutlineTree;
