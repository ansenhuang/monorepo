import cloneDeep from 'lodash/cloneDeep';
import type { SortableStore, EventHandler, EventTypes } from './types';

export const getObjectKeys = Object.keys as <T extends Object>(obj: T) => Array<keyof T>;

const sortableStore: SortableStore = {
  draggingItems: null,
};

export const domEventHandlers: Partial<Record<EventTypes, EventHandler>> = {
  onStart: (e, store) => {
    const { items } = store;
    sortableStore.draggingItems = items;
  },
  onEnd: (e, store) => {
    sortableStore.draggingItems = null;
  },
  onAdd: (e, store) => {
    const { oldIndex, newIndex, pullMode, from, to, clone, item } = e;
    const { items, setItems, cloneItem } = store;
    const { draggingItems } = sortableStore;
    if (oldIndex != null && newIndex != null && draggingItems != null) {
      const newItems = [...items];
      let addItem = draggingItems[oldIndex];
      if (pullMode === 'clone') {
        addItem = cloneItem ? cloneItem(addItem) : cloneDeep(addItem);
        // 还原sortablejs的dom操作，避免出现2个dom节点
        to.removeChild(item);
        from.replaceChild(item, clone);
      }
      newItems.splice(newIndex, 0, addItem);
      setItems(newItems, e);
    }
  },
  onRemove: (e, store) => {
    const { oldIndex, pullMode, from, item } = e;
    const { items, setItems } = store;
    if (oldIndex != null && pullMode !== 'clone') {
      const newItems = [...items];
      newItems.splice(oldIndex, 1);
      // 还原sortablejs的dom操作，避免react diff找不到原来的dom移除
      from.insertBefore(item, from.children[oldIndex]);
      setItems(newItems, e);
    }
  },
  onUpdate: (e, store) => {
    const { oldIndex, newIndex } = e;
    const { items, setItems } = store;
    if (oldIndex != null && newIndex != null) {
      const newItems = [...items];
      const oldItem = newItems[oldIndex];
      if (oldIndex > newIndex) {
        newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, oldItem);
      } else {
        newItems.splice(newIndex + 1, 0, oldItem);
        newItems.splice(oldIndex, 1);
      }
      setItems(newItems, e);
    }
  },
};
