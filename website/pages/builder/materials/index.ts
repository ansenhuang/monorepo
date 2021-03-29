import { Card, Input, Button } from 'antd';
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
        labelCol: { span: 6 },
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
        labelCol: { span: 6 },
        initialValue: 2,
        rules: [{ required: true, message: '请输入列数' }],
        formType: 'InputNumber',
        formProps: {
          min: 1,
          max: 24,
          step: 1,
          precision: 0,
          placeholder: '请输入列数',
        },
      },
      justify: {
        label: '水平排列',
        labelCol: { span: 6 },
        initialValue: 'start',
        formType: 'Select',
        formProps: {
          options: [
            { label: 'start', value: 'start' },
            { label: 'center', value: 'center' },
            { label: 'end', value: 'end' },
            { label: 'space-around', value: 'space-around' },
            { label: 'space-between', value: 'space-between' },
          ],
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
        labelCol: { span: 6 },
        initialValue: '请输入',
        rules: [{ required: true, message: '请输入提示' }],
        formType: 'Input',
        formProps: {
          placeholder: '请输入提示',
        },
      },
    },
  },
  {
    name: 'Button',
    label: '按钮',
    type: 'component',
    Component: Button,
    propsSchema: {
      type: {
        label: '类型',
        labelCol: { span: 6 },
        initialValue: 'default',
        formType: 'Select',
        formProps: {
          options: [
            { label: 'default', value: 'default' },
            { label: 'primary', value: 'primary' },
            { label: 'ghost', value: 'ghost' },
            { label: 'dashed', value: 'dashed' },
            { label: 'link', value: 'link' },
            { label: 'text', value: 'text' },
          ],
        },
      },
      block: {
        label: '块级',
        labelCol: { span: 6 },
        initialValue: false,
        formType: 'Switch',
        valuePropName: 'checked',
        formProps: {},
      },
      children: {
        label: '文字',
        labelCol: { span: 6 },
        initialValue: '按钮',
        rules: [{ required: true, message: '请输入文字' }],
        formType: 'Input',
        formProps: {
          placeholder: '请输入文字',
        },
      },
    },
  },
];

export default materials;
