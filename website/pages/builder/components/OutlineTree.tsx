import React, { useMemo } from 'react';
import styled from 'styled-components';
import produce from 'immer';
import ReactSortable from '@axe/sortable';
import { useAtomState } from '@axe/context';
import { pageSchemaState } from '../atoms';
import { getTargetFromTree, buildNodeSchema } from '../helpers';
import type { SortableEvent } from '@axe/sortable';
import type { PageSchema, NodeSchema } from '../types';

const Tree = styled.div`
  margin-left: -20px;
`;
const SortableList = styled(ReactSortable)`
  padding-left: 20px;
`;
const SortableItem = styled.div`
  /* padding-left: 20px; */
`;
const Text = styled.div`
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

interface MoveItemStore {
  newItems: NodeSchema[];
  paths: string[];
  index: number;
}

const OutlineTree: React.FC = () => {
  const [pageSchema, setPageSchema] = useAtomState(pageSchemaState);

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

  const renderSortable = (schema: PageSchema | NodeSchema, paths: string[]) => {
    const { name, children } = schema;

    if (children == null) {
      return null;
    }

    if (!Array.isArray(children)) {
      const item = children;
      return (
        <div style={{ paddingLeft: 20 }}>
          <SortableItem key={item.key}>
            <Text style={{ cursor: 'not-allowed' }}>
              {item.label} ({item.key})
            </Text>
            {renderSortable(item, [...paths, 'children'])}
          </SortableItem>
        </div>
      );
    }

    return (
      <SortableList
        group={{
          name: 'outline_' + name,
          put: true,
        }}
        animation={150}
        draggable={'.' + SortableItem.styledComponentId}
        items={children}
        setItems={(newItems: any[], e) => setItems(newItems, [...paths, 'children'], e)}
        cloneItem={(item: any) => buildNodeSchema(item)}
      >
        {children.map((item, index) => (
          <SortableItem key={item.key}>
            <Text>
              {item.label} ({item.key})
            </Text>
            {renderSortable(item, [...paths, 'children', String(index)])}
          </SortableItem>
        ))}
      </SortableList>
    );
  };

  return <Tree>{renderSortable(pageSchema, [])}</Tree>;
};

export default OutlineTree;
