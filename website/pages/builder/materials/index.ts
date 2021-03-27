import { Card, Input, Button, Row, Col } from 'antd';
import Grid from './Grid';
import type { MaterialSchema } from '../types';

const materials: MaterialSchema[] = [
  {
    name: 'Card',
    label: '分组',
    type: 'component',
    Component: Card,
    props: {
      title: '分组',
    },
    children: [],
  },
  {
    name: 'Grid',
    label: '栅格',
    type: 'builder',
    Component: Grid,
    props: {
      cols: 2,
    },
    children: [
      {
        name: 'Row',
        label: '行',
        type: 'component',
        Component: Row,
        props: {},
        children: [
          {
            name: 'Col',
            label: '列',
            type: 'component',
            Component: Col,
            props: {
              span: 12,
            },
            children: [],
          },
          {
            name: 'Col',
            label: '列',
            type: 'component',
            Component: Col,
            props: {
              span: 12,
            },
            children: [],
          },
        ],
      },
    ],
  },
  {
    name: 'Button',
    label: '按钮',
    type: 'component',
    Component: Button,
    props: {
      children: '按钮',
    },
  },
  {
    name: 'Input',
    label: '输入框',
    type: 'component',
    Component: Input,
    props: {
      placeholder: '请输入',
    },
  },
];

export default materials;
