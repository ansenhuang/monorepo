import Sortable from 'sortablejs';

export interface ItemInterface {
  key: string;
  [property: string]: any;
}

export interface MemoStore<T> {
  sortable: Sortable | null;
  items: ReactSortableProps<T>['items'];
  setItems: ReactSortableProps<T>['setItems'];
  cloneItem: ReactSortableProps<T>['cloneItem'] | null;
  eventHandlers: Partial<Record<EventTypes, (e: Sortable.SortableEvent) => void>> | null;
}

export interface SortableStore {
  draggingItems: any[] | null;
}

export interface ReactSortableProps<T> extends Sortable.Options {
  tagName?: string;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  items: T[];
  setItems: (newItems: T[]) => void;
  cloneItem?: (item: T) => T;
  children: React.ReactElement[];
}

export type EventTypes =
  | 'onChoose' // 选中时
  | 'onClone' // pull=clone时
  | 'onStart' // 拖拽开始时
  // 'onMove' |  // 拖拽移动时，实时触发
  | 'onChange' // 同上
  | 'onUnchoose' // 取消选中时，即释放
  | 'onUpdate' // 释放时，仅列表内触发
  | 'onAdd' // 添加时，即从另一个列表移动到当前列表
  | 'onRemove' // 移除时，即从当前列表移动到另一个列表
  | 'onSort' // 释放时，有变更就触发
  | 'onEnd' // 释放结束时
  | 'onFilter'; // 拖拽filtered元素时

export type EventHandler = <T>(e: Sortable.SortableEvent, store: MemoStore<T>) => void;
