import React from 'react';
import Form from '@axe/form';
import { Button } from 'antd';

const CustomUsage = () => {
  const [form] = Form.useForm();

  const handleFill = () => {
    form.setFieldsValue({
      name: 'admin',
      list: [
        { key: 1, value: '1' },
        { key: 2, value: '2' },
      ],
    });
  };
  const handleValuesChange = (changedValues: any, allValues: any) => {
    console.log('change', changedValues, allValues);
  };

  return (
    <Form
      form={form}
      style={{ width: 500 }}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      items={[
        {
          name: 'name',
          label: '用户名',
          rules: [{ required: true, message: 'Please input your name!' }],
          formType: 'Input',
        },
        {
          name: 'list',
          label: '列表',
          formType: 'SortableList',
        },
      ]}
      onValuesChange={handleValuesChange}
    >
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" onClick={handleFill}>
          填充
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CustomUsage;
