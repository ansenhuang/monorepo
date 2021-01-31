import React, { Children, cloneElement, useEffect, useMemo, useRef } from 'react';
import Sortable from 'sortablejs';
import { getObjectKeys, domEventHandlers } from './helpers';
import type { ReactSortableProps, MemoStore, ItemInterface } from './types';

const ReactSortable = <T extends ItemInterface>({
  tagName = 'div',
  id,
  className,
  style,
  children,
  // effect
  items,
  setItems,
  cloneItem,
  // events
  onChoose,
  onClone,
  onStart,
  onMove,
  onChange,
  onUnchoose,
  onUpdate,
  onAdd,
  onRemove,
  onSort,
  onEnd,
  onFilter,
  // rest sortablejs options
  dataIdAttr = 'data-id',
  ...restOptions
}: ReactSortableProps<T>) => {
  const ref = useRef<HTMLDivElement>(null);
  // 缓存数据用作引用
  const store = useMemo<MemoStore<T>>(
    () => ({
      sortable: null,
      items: [],
      setItems: () => {},
      cloneItem: null,
      eventHandlers: null,
    }),
    [],
  );

  const elements = Children.map(children, (child) => {
    return cloneElement(child, {
      [dataIdAttr]: child.key,
    });
  });

  // 缓存当前数据
  useEffect(() => {
    store.items = items;
    store.setItems = setItems;
    store.cloneItem = cloneItem;

    const eventHandlers = {
      onChoose,
      onClone,
      onStart,
      onMove,
      onChange,
      onUnchoose,
      onUpdate,
      onAdd,
      onRemove,
      onSort,
      onEnd,
      onFilter,
    };
    getObjectKeys(eventHandlers).forEach((eventType) => {
      if (eventType !== 'onMove') {
        const handler = eventHandlers[eventType];
        const domHandler = domEventHandlers[eventType];
        eventHandlers[eventType] = (e) => {
          domHandler?.(e, store);
          handler?.(e);
        };
      }
    });
    store.eventHandlers = eventHandlers;
  }, [
    store,
    items,
    setItems,
    cloneItem,
    onChoose,
    onClone,
    onStart,
    onMove,
    onChange,
    onUnchoose,
    onUpdate,
    onAdd,
    onRemove,
    onSort,
    onEnd,
    onFilter,
  ]);

  /* eslint-disable react-hooks/exhaustive-deps */
  // 初始时实例化sortablejs
  useEffect(() => {
    const container = ref.current;
    if (container) {
      const options = {
        ...restOptions,
        ...store.eventHandlers,
      };
      store.sortable = Sortable.create(container, options);
    }

    return () => {
      if (store.sortable) {
        store.sortable.destroy();
        store.sortable = null;
      }
    };
  }, []);

  return React.createElement(
    tagName,
    {
      ref,
      id,
      className,
      style,
    },
    elements,
  );
};

export default ReactSortable;
