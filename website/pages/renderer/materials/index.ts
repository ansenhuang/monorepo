import { Row, Col, Form } from 'antd';
import Group from './Group';
import Button from './Button';
import Input from './Input';

const materials = [
  {
    name: 'Group',
    label: '分组',
    Component: Group,
  },
  {
    name: 'Input',
    label: '输入框',
    Component: Input,
  },
  {
    name: 'Button',
    label: '按钮',
    Component: Button,
  },
  {
    name: 'Row',
    label: '栅格行',
    Component: Row,
  },
  {
    name: 'Col',
    label: '栅格列',
    Component: Col,
  },
  {
    name: 'Form',
    label: '表单域',
    Component: Form,
  },
  {
    name: 'FormItem',
    label: '表单项',
    Component: Form.Item,
  },
];

export default materials;
