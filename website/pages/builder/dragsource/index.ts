import React from 'react';
import Group from './Group';
import Button from './Button';
import Input from './Input';

export interface DragSourceItem {
  key: string;
  name: string;
  label: string;
  Component: React.ComponentType<any>;
  props: any;
}
export type DragSource = DragSourceItem[];

const dragSource: DragSource = [
  {
    key: 'group',
    name: 'group',
    label: '分组',
    Component: Group,
    props: {
      title: '分组',
    },
  },
  {
    key: 'button',
    name: 'button',
    label: '按钮',
    Component: Button,
    props: {
      text: '按钮',
    },
  },
  {
    key: 'input',
    name: 'input',
    label: '输入框',
    Component: Input,
    props: {
      placeholder: '请输入',
    },
  },
];

export default dragSource;
