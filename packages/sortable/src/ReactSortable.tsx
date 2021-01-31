import React, { Children, cloneElement, useEffect, useMemo, useRef } from 'react';
import Sortable from 'sortablejs';
import { getObjectKeys, eventHandlers } from './helpers';

interface MemoStore {
  sortable: Sortable | null;
  items: any[];
}

export interface ReactSortableProps extends Sortable.Options {
  tagName?: string;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  items: any[];
  setItems: (newItems: any[]) => void;
  children: React.ReactElement[];
}

const ReactSortable: React.FC<ReactSortableProps> = ({
  tagName = 'div',
  id,
  className,
  style,
  items,
  setItems,
  children,
  ...options
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const store = useMemo<MemoStore>(
    () => ({
      sortable: null,
      items: [],
    }),
    [],
  );

  const dataId = options.dataIdAttr || 'data-id';
  const elements = Children.map(children, (child) => {
    return cloneElement(child, {
      [dataId]: child.key,
    });
  });

  /* eslint-disable react-hooks/exhaustive-deps */
  // 初始时实例化sortablejs
  useEffect(() => {
    const container = ref.current;
    if (container) {
      const makeOptions = (options: Sortable.Options): Sortable.Options => {
        const newOptions = { ...options };

        getObjectKeys(eventHandlers).forEach((eventType) => {
          const handler = eventHandlers[eventType];
          newOptions[eventType] = (e) => {
            handler(e, store.items, setItems);
            options[eventType]?.(e);
          };
        });

        return newOptions;
      };
      store.sortable = Sortable.create(container, makeOptions(options));
    }

    return () => {
      if (store.sortable) {
        store.sortable.destroy();
        store.sortable = null;
      }
    };
  }, []);

  // 缓存当前数据
  useEffect(() => {
    store.items = items;
  }, [items]);

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
