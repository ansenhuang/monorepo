import cloneDeep from 'lodash/cloneDeep';
import type { SortableEvent } from 'sortablejs';
import type { ReactSortableProps } from './ReactSortable';

export const getObjectKeys = Object.keys as <T extends Object>(obj: T) => Array<keyof T>;

// type EventTypes =
//   'onChoose' | // 选中时
//   'onClone' | // pull=clone时
//   'onStart' |  // 拖拽开始时
//   'onMove' |  // 拖拽移动时，实时触发
//   'onChange' | // 同上
//   'onUnchoose' | // 取消选中时，即释放
//   'onUpdate' | // 释放时，仅列表内触发
//   'onAdd' | // 添加时，即从另一个列表移动到当前列表
//   'onRemove' | // 移除时，即从当前列表移动到另一个列表
//   'onSort' | // 释放时，有变更就触发
//   'onEnd' |  // 释放结束时
//   'onFilter'; // 拖拽filtered元素时

type EventHandlerArgs = [
  SortableEvent,
  ReactSortableProps['items'],
  ReactSortableProps['setItems'],
];

interface SortableStore {
  draggingItems: any[] | null;
}

const sortableStore: SortableStore = {
  draggingItems: null,
};

export const eventHandlers = {
  onStart: (...args: EventHandlerArgs) => {
    const [, items] = args;
    sortableStore.draggingItems = items;
  },
  onEnd: (...args: EventHandlerArgs) => {
    // const [, items, ] = args;
    sortableStore.draggingItems = null;
  },
  onAdd: (...args: EventHandlerArgs) => {
    const [e, items, setItems] = args;
    const { oldIndex, newIndex, pullMode, from, to, clone, item } = e;
    const { draggingItems } = sortableStore;
    if (oldIndex != null && newIndex != null && draggingItems != null) {
      const newItems = [...items];
      const addItem = cloneDeep(draggingItems[oldIndex]);
      if (pullMode === 'clone') {
        // 还原sortablejs的dom操作，避免出现2个dom节点
        to.removeChild(item);
        from.replaceChild(item, clone);
      }
      newItems.splice(newIndex, 0, addItem);
      setItems(newItems);
    }
  },
  onRemove: (...args: EventHandlerArgs) => {
    const [e, items, setItems] = args;
    const { oldIndex, pullMode, from, item } = e;

    if (oldIndex != null && pullMode !== 'clone') {
      const newItems = [...items];
      newItems.splice(oldIndex, 1);
      // 还原sortablejs的dom操作，避免react diff找不到原来的dom移除
      from.insertBefore(item, from.children[oldIndex]);
      setItems(newItems);
    }
  },
  onUpdate: (...args: EventHandlerArgs) => {
    const [e, items, setItems] = args;
    const { oldIndex, newIndex } = e;
    if (oldIndex != null && newIndex != null) {
      const newItems = [...items];
      const oldItem = newItems[oldIndex];
      const newItem = newItems[newIndex];
      newItems[oldIndex] = newItem;
      newItems[newIndex] = oldItem;
      setItems(newItems);
    }
  },
};
