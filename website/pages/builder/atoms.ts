import { setAtomState } from '@axe/context';
import materials from './materials';
import { getPageSchema } from './helpers';
import type { NodeSchema } from './types';

export const materialsState = setAtomState(materials);
export const pageSchemaState = setAtomState(getPageSchema(materials));
export const selectedNodeState = setAtomState<NodeSchema | null>(null);
