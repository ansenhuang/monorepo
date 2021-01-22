import { setAtomState } from '@axe/context';

export const countAAtomState = setAtomState(0);
export const countBAtomState = setAtomState(100);
export const contentAtomState = setAtomState({
  liked: 0,
  collected: 0,
});
