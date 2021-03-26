import { Card, Input, Button } from 'antd';
import type { MaterialSchema } from '../types';

const materials: MaterialSchema[] = [
  {
    name: 'Card',
    label: '分组',
    isContainer: true,
    Component: Card,
    defaultProps: {
      title: '分组',
    },
  },
  {
    name: 'Button',
    label: '按钮',
    Component: Button,
    defaultProps: {
      children: '按钮',
    },
  },
  {
    name: 'Input',
    label: '输入框',
    Component: Input,
    defaultProps: {
      placeholder: '请输入',
    },
  },
];

export default materials;
