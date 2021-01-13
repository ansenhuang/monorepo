import React, { useState, useEffect, useCallback, useMemo, createElement, Fragment } from 'react';

type TypeKey = string;
type TypeQueueFn = () => void;

export type StateStore = Map<TypeKey, any>;
export type StateQueue = Map<TypeKey, TypeQueueFn[]>;
export interface RootProviderProps {
  value?: Record<TypeKey, any>;
  initialValue?: Record<TypeKey, any>;
  children?: React.ReactNode;
}

/* eslint-disable react-hooks/rules-of-hooks */
export default class RootContextClass {
  private stateStore: StateStore = new Map();
  private stateQueue: StateQueue = new Map();

  private setDefaultStore(store: Record<TypeKey, any> = {}) {
    Object.keys(store).forEach((key) => {
      this.stateStore.set(key, store[key]);
    });
  }

  public RootProvider: React.FC<RootProviderProps> = ({ value, initialValue, children }) => {
    /* eslint-disable react-hooks/exhaustive-deps */
    useMemo(() => {
      if (initialValue) {
        this.setDefaultStore(initialValue);
      }
    }, []);
    useMemo(() => {
      if (value) {
        this.setDefaultStore(value);
      }
    }, [value]);

    return createElement(Fragment, null, children);
  };

  private getStateQueue(key: TypeKey) {
    return this.stateQueue.get(key);
  }

  private pushStateQueue(key: TypeKey, fn: TypeQueueFn) {
    let queue = this.getStateQueue(key);
    if (!queue) {
      queue = [];
      this.stateQueue.set(key, queue);
    }
    queue.push(fn);
  }

  private removeStateQueue(key: TypeKey, fn: TypeQueueFn) {
    const queue = this.getStateQueue(key);
    if (queue) {
      const index = queue.findIndex((q) => q === fn);
      if (index !== -1) {
        queue.splice(index, 1);
      }
    }
  }

  public useRootState = <T = any>(key: string): [T, (newValue: T) => void] => {
    const [, setState] = useState({});
    const value: T = this.stateStore.get(key);
    const forceUpdate = useCallback(() => {
      // 触发react更新
      setState({});
    }, []);
    const setValue = (newValue: T) => {
      // 更新context的引用值
      this.stateStore.set(key, newValue);
      // 触发所有队列的更新
      const queue = this.getStateQueue(key);
      if (queue) {
        queue.forEach((fn) => fn());
      }
    };

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
      // 推入队列，一个值在多个组件中使用可以同步状态更新
      this.pushStateQueue(key, forceUpdate);

      // 卸载处理，直接删除队列函数
      return () => {
        this.removeStateQueue(key, forceUpdate);
      };
    }, []);

    return [value, setValue];
  };
}
