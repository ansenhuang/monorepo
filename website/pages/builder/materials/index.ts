import { Card, Input, TextArea, Button } from './basic';
import Grid from './Grid';
import Tab from './Tab';
import type { MaterialSchema } from '../types';
import type { AxeFormItemConfig } from '@axe/form/src';

const buildPropsSchemaItem = (
  data: Omit<AxeFormItemConfig, 'name'>,
): Omit<AxeFormItemConfig, 'name'> => {
  return {
    labelCol: { span: 6 },
    colon: false,
    ...data,
  };
};

const materials: MaterialSchema[] = [
  {
    name: 'Card',
    label: '分组',
    type: 'layout',
    Component: Card,
    propsSchema: {
      title: buildPropsSchemaItem({
        label: '标题',
        initialValue: '分组',
        rules: [{ required: true, message: '请输入标题' }],
        formType: 'Input',
        formProps: {},
      }),
    },
    children: [],
  },
  {
    name: 'Grid',
    label: '栅格',
    type: 'builder',
    accept: false,
    Component: Grid,
    propsSchema: {
      cols: buildPropsSchemaItem({
        label: '列数',
        initialValue: 2,
        rules: [{ required: true, message: '请输入列数' }],
        formType: 'InputNumber',
        formProps: {
          min: 1,
          max: 24,
          step: 1,
          precision: 0,
        },
      }),
      justify: buildPropsSchemaItem({
        label: '水平排列',
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
      }),
      align: buildPropsSchemaItem({
        label: '垂直排列',
        initialValue: 'top',
        formType: 'Select',
        formProps: {
          options: [
            { label: 'top', value: 'top' },
            { label: 'middle', value: 'middle' },
            { label: 'bottom', value: 'bottom' },
          ],
        },
      }),
      gutter: buildPropsSchemaItem({
        label: '间隔',
        initialValue: 0,
        formType: 'InputNumber',
        formProps: {
          min: 0,
          step: 1,
          precision: 0,
        },
      }),
      // wrap: buildPropsSchemaItem({
      //   label: '自动换行',
      //   initialValue: true,
      //   formType: 'Switch',
      //   valuePropName: 'checked',
      //   formProps: {},
      // }),
    },
    children: [],
  },
  {
    name: 'Tab',
    label: '选项卡',
    type: 'builder',
    accept: false,
    Component: Tab,
    propsSchema: {
      tabPanes: buildPropsSchemaItem({
        label: '选项',
        initialValue: [{ key: 'init', value: '标签项' }],
        rules: [{ required: true, type: 'array', message: '请添加选项' }],
        formType: 'SortableList',
        formProps: {
          placeholder: '请输入标签内容',
        },
      }),
      type: buildPropsSchemaItem({
        label: '类型',
        initialValue: 'line',
        formType: 'Select',
        formProps: {
          options: [
            { label: 'line', value: 'line' },
            { label: 'card', value: 'card' },
            // { label: 'editable-card', value: 'editable-card' },
          ],
        },
      }),
      size: buildPropsSchemaItem({
        label: '尺寸',
        initialValue: 'default',
        formType: 'Select',
        formProps: {
          options: [
            { label: 'default', value: 'default' },
            { label: 'large', value: 'large' },
            { label: 'small', value: 'small' },
          ],
        },
      }),
      tabPosition: buildPropsSchemaItem({
        label: '位置',
        initialValue: 'top',
        formType: 'Select',
        formProps: {
          options: [
            { label: 'top', value: 'top' },
            { label: 'bottom', value: 'bottom' },
            { label: 'left', value: 'left' },
            { label: 'right', value: 'right' },
          ],
        },
      }),
      tabBarGutter: buildPropsSchemaItem({
        label: '间隔',
        initialValue: 0,
        formType: 'InputNumber',
        formProps: {
          min: 0,
          step: 1,
          precision: 0,
        },
      }),
      centered: buildPropsSchemaItem({
        label: '居中',
        initialValue: false,
        formType: 'Switch',
        valuePropName: 'checked',
        formProps: {},
      }),
    },
    children: [],
  },
  {
    name: 'Input',
    label: '单行文本',
    type: 'form',
    Component: Input,
    propsSchema: {
      defaultValue: buildPropsSchemaItem({
        label: '默认值',
        formType: 'Input',
        formProps: {},
      }),
      placeholder: buildPropsSchemaItem({
        label: '提示',
        formType: 'Input',
        formProps: {},
      }),
      type: buildPropsSchemaItem({
        label: '类型',
        initialValue: 'text',
        formType: 'Select',
        formProps: {
          options: [
            { label: 'text', value: 'text' },
            { label: 'password', value: 'password' },
            { label: 'file', value: 'file' },
            { label: 'search', value: 'search' },
            { label: 'email', value: 'email' },
            { label: 'number', value: 'number' },
            { label: 'tel', value: 'tel' },
            { label: 'url', value: 'url' },
            { label: 'button', value: 'button' },
            { label: 'color', value: 'color' },
            { label: 'checkbox', value: 'checkbox' },
            { label: 'radio', value: 'radio' },
            { label: 'range', value: 'range' },
            { label: 'image', value: 'image' },
            { label: 'hidden', value: 'hidden' },

            { label: 'date', value: 'date' },
            { label: 'datetime', value: 'datetime' },
            { label: 'datetime-local', value: 'datetime-local' },
            { label: 'month', value: 'month' },
            { label: 'week', value: 'week' },
            { label: 'time', value: 'time' },

            { label: 'reset', value: 'reset' },
            { label: 'submit', value: 'submit' },
          ],
        },
      }),
      size: buildPropsSchemaItem({
        label: '尺寸',
        initialValue: 'middle',
        formType: 'Select',
        formProps: {
          options: [
            { label: 'large', value: 'large' },
            { label: 'middle', value: 'middle' },
            { label: 'small', value: 'small' },
          ],
        },
      }),
      maxLength: buildPropsSchemaItem({
        label: '最大长度',
        formType: 'InputNumber',
        formProps: {
          min: 0,
          step: 1,
          precision: 0,
        },
      }),
      allowClear: buildPropsSchemaItem({
        label: '清空',
        initialValue: true,
        formType: 'Switch',
        valuePropName: 'checked',
        formProps: {},
      }),
      bordered: buildPropsSchemaItem({
        label: '边框',
        initialValue: true,
        formType: 'Switch',
        valuePropName: 'checked',
        formProps: {},
      }),
      disabled: buildPropsSchemaItem({
        label: '禁用',
        initialValue: false,
        formType: 'Switch',
        valuePropName: 'checked',
        formProps: {},
      }),
    },
  },
  {
    name: 'TextArea',
    label: '多行文本',
    type: 'form',
    Component: TextArea,
    propsSchema: {
      defaultValue: buildPropsSchemaItem({
        label: '默认值',
        formType: 'Input',
        formProps: {},
      }),
      placeholder: buildPropsSchemaItem({
        label: '提示',
        formType: 'Input',
        formProps: {},
      }),
      size: buildPropsSchemaItem({
        label: '尺寸',
        initialValue: 'middle',
        formType: 'Select',
        formProps: {
          options: [
            { label: 'large', value: 'large' },
            { label: 'middle', value: 'middle' },
            { label: 'small', value: 'small' },
          ],
        },
      }),
      maxLength: buildPropsSchemaItem({
        label: '最大长度',
        formType: 'InputNumber',
        formProps: {
          min: 0,
          step: 1,
          precision: 0,
        },
      }),
      rows: buildPropsSchemaItem({
        label: '行数',
        formType: 'InputNumber',
        formProps: {
          min: 1,
          step: 1,
          precision: 0,
        },
      }),
      autoSize: buildPropsSchemaItem({
        label: '自适应',
        initialValue: false,
        formType: 'Switch',
        valuePropName: 'checked',
        formProps: {},
      }),
      showCount: buildPropsSchemaItem({
        label: '展示字数',
        initialValue: false,
        formType: 'Switch',
        valuePropName: 'checked',
        formProps: {},
      }),
      allowClear: buildPropsSchemaItem({
        label: '清空',
        initialValue: true,
        formType: 'Switch',
        valuePropName: 'checked',
        formProps: {},
      }),
      bordered: buildPropsSchemaItem({
        label: '边框',
        initialValue: true,
        formType: 'Switch',
        valuePropName: 'checked',
        formProps: {},
      }),
      disabled: buildPropsSchemaItem({
        label: '禁用',
        initialValue: false,
        formType: 'Switch',
        valuePropName: 'checked',
        formProps: {},
      }),
    },
  },
  {
    name: 'Button',
    label: '按钮',
    type: 'component',
    Component: Button,
    propsSchema: {
      children: buildPropsSchemaItem({
        label: '文字',
        initialValue: '按钮',
        rules: [{ required: true, message: '请输入文字' }],
        formType: 'Input',
        formProps: {},
      }),
      type: buildPropsSchemaItem({
        label: '类型',
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
      }),
      shape: buildPropsSchemaItem({
        label: '形状',
        initialValue: 'default',
        formType: 'Select',
        formProps: {
          options: [
            { label: 'default', value: 'default' },
            { label: 'circle', value: 'circle' },
            { label: 'round', value: 'round' },
          ],
        },
      }),
      size: buildPropsSchemaItem({
        label: '尺寸',
        initialValue: 'middle',
        formType: 'Select',
        formProps: {
          options: [
            { label: 'large', value: 'large' },
            { label: 'middle', value: 'middle' },
            { label: 'small', value: 'small' },
          ],
        },
      }),
      block: buildPropsSchemaItem({
        label: '块级',
        initialValue: false,
        formType: 'Switch',
        valuePropName: 'checked',
        formProps: {},
      }),
      danger: buildPropsSchemaItem({
        label: '危险',
        initialValue: false,
        formType: 'Switch',
        valuePropName: 'checked',
        formProps: {},
      }),
      ghost: buildPropsSchemaItem({
        label: '幽灵',
        initialValue: false,
        formType: 'Switch',
        valuePropName: 'checked',
        formProps: {},
      }),
      loading: buildPropsSchemaItem({
        label: '加载中',
        initialValue: false,
        formType: 'Switch',
        valuePropName: 'checked',
        formProps: {},
      }),
    },
  },
];

export default materials;
