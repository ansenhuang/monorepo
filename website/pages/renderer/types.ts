export interface NodeSchema {
  key: string;
  name: string;
  label: string;
  props: Record<string, any>;
  slots: Record<string, NodeSchema | NodeSchema[]>;
}

export interface PageSchema {
  root: true;
  nodes: NodeSchema[];
}
