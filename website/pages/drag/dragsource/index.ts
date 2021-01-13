import React from 'react';
import Group from './Group';
import Button from './Button';
import Input from './Input';

export interface DragSourceItem {
  name: string;
  label: string;
  Component: React.ComponentType<any>;
  props: any;
}
export type DragSource = DragSourceItem[];

const dragSource: DragSource = [
  {
    name: 'group',
    label: '分组',
    Component: Group,
    props: {
      title: '分组',
    },
  },
  {
    name: 'button',
    label: '按钮',
    Component: Button,
    props: {
      text: '按钮',
    },
  },
  {
    name: 'input',
    label: '输入框',
    Component: Input,
    props: {
      value: '默认值',
    },
  },
];

export default dragSource;
