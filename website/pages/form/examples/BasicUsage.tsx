import React from 'react';
import Form from '@axe/form';
import { Button } from 'antd';

const BasicUsage = () => {
  const [form] = Form.useForm();

  const handleFill = () => {
    form.setFieldsValue({
      username: 'admin',
      password: '123456',
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
          name: 'username',
          label: '用户名',
          rules: [{ required: true, message: 'Please input your username!' }],
          formType: 'Input',
        },
        {
          name: 'password',
          label: '密码',
          rules: [{ required: true, message: 'Please input your password!' }],
          formType: 'Password',
          hasFeedback: true,
        },
        {
          name: 'confirmPassword',
          label: '确认密码',
          rules: [
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),
          ],
          formType: 'Password',
          dependencies: ['password'],
          hasFeedback: true,
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

export default BasicUsage;
