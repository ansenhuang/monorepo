import { useEffect, useState } from 'react';
import type { SetStateAction } from 'react';

type AtomKey = number;
interface AtomState<T> {
  key: AtomKey;
  initialState: T;
}
type QueueCallback = () => void;
type StateStore = Map<AtomKey, any>;
type StateQueue = Map<AtomKey, QueueCallback[]>;

const stateStore: StateStore = new Map();
const stateQueue: StateQueue = new Map();
let currentAtomKey = 1;

const getAtomKey = (): AtomKey => currentAtomKey++;

const setAtomState = <T>(initialState: T): AtomState<T> => {
  Object.freeze(initialState);

  const key = getAtomKey();
  const atomState = {
    key,
    initialState,
  };

  stateStore.set(key, initialState);
  return atomState;
};

const addQueueListener = (key: AtomKey, fn: QueueCallback): void => {
  const queue = stateQueue.get(key) || [];
  const newQueue = [...queue, fn];
  stateQueue.set(key, newQueue);
};

const removeQueueListener = (key: AtomKey, fn: QueueCallback) => {
  const queue = stateQueue.get(key) || [];
  const newQueue = queue.filter((q) => q !== fn);
  stateQueue.set(key, newQueue);
};

const useAtomState = <T>(atomState: AtomState<T>): [T, (nextState: SetStateAction<T>) => void] => {
  const [, setState] = useState({});
  const { key } = atomState;
  const currentState: T = stateStore.get(key);

  const updateState = (nextState: SetStateAction<T>) => {
    const newState = !(nextState instanceof Function) ? nextState : nextState(currentState);
    stateStore.set(key, newState);
    const queue = stateQueue.get(key);
    if (queue) {
      queue.forEach((fn) => fn());
    }
  };

  useEffect(() => {
    const forceUpdate = () => setState({});
    addQueueListener(key, forceUpdate);

    return () => {
      removeQueueListener(key, forceUpdate);
    };
  }, [key]);

  return [currentState, updateState];
};

export { setAtomState, useAtomState };
