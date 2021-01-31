import Group from './Group';
import Button from './Button';
import Input from './Input';
import type { DragSourceItem } from '../types';

const dragSource: DragSourceItem[] = [
  {
    key: 'group',
    name: 'group',
    label: '分组',
    Component: Group,
    props: {
      title: '分组',
    },
    children: [],
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
