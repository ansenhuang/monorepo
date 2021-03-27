import { Card, Input, Button, Row, Col } from 'antd';
import Grid from './Grid';
import type { MaterialSchema } from '../types';

const materials: MaterialSchema[] = [
  {
    name: 'Card',
    label: '分组',
    type: 'component',
    Component: Card,
    propsSchema: {
      title: {
        label: '标题',
        initialValue: '分组',
        rules: [{ required: true, message: '请输入标题' }],
        formType: 'Input',
        formProps: {
          placeholder: '请输入标题',
        },
      },
    },
    children: [],
  },
  {
    name: 'Grid',
    label: '栅格',
    type: 'builder',
    Component: Grid,
    propsSchema: {
      cols: {
        label: '列数',
        initialValue: 2,
        rules: [{ required: true, message: '请输入列数' }],
        formType: 'InputNumber',
        formProps: {
          min: 1,
          placeholder: '请输入列数',
        },
      },
    },
    children: [
      {
        name: 'Row',
        label: '行',
        type: 'component',
        Component: Row,
        propsSchema: {},
        children: [
          {
            name: 'Col',
            label: '列',
            type: 'component',
            Component: Col,
            propsSchema: {
              span: {
                label: '栅格数',
                initialValue: 12,
                rules: [{ required: true, message: '请输入栅格数' }],
                formType: 'InputNumber',
                formProps: {
                  min: 1,
                  placeholder: '请输入栅格数',
                },
              },
            },
            children: [],
          },
          {
            name: 'Col',
            label: '列',
            type: 'component',
            Component: Col,
            propsSchema: {
              span: {
                label: '栅格数',
                initialValue: 12,
                rules: [{ required: true, message: '请输入栅格数' }],
                formType: 'InputNumber',
                formProps: {
                  min: 1,
                  placeholder: '请输入栅格数',
                },
              },
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
    propsSchema: {
      children: {
        label: '文字',
        initialValue: '按钮',
        rules: [{ required: true, message: '请输入文字' }],
        formType: 'Input',
        formProps: {
          placeholder: '请输入文字',
        },
      },
    },
  },
  {
    name: 'Input',
    label: '输入框',
    type: 'component',
    Component: Input,
    propsSchema: {
      placeholder: {
        label: '提示',
        initialValue: '请输入',
        rules: [{ required: true, message: '请输入提示' }],
        formType: 'Input',
        formProps: {
          placeholder: '请输入提示',
        },
      },
    },
  },
];

export default materials;
