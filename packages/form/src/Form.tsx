import React, { useEffect, useMemo } from 'react';
import { Form } from 'antd';
import defaultFormItems from './formItems';
import type { FormProps, FormItemProps, FormInstance } from 'antd/lib/form';

export interface AxeFormItemConfig extends FormItemProps {
  name: string;
  formType: string;
  formProps?: Record<string, any>;
}
export interface AxeFormProps extends FormProps {
  form?: FormInstance;
  items: AxeFormItemConfig[];
  formItems?: Record<string, React.ComponentType<any>>;
  validateInitial?: boolean;
}
export interface AxeFormInterface {
  useForm: typeof Form.useForm;
  Item: typeof Form.Item;
}

const AxeForm = ({
  form: topForm,
  items,
  formItems,
  validateInitial,
  children,
  ...restFormProps
}: AxeFormProps): React.ReactElement<any, any> => {
  const [currentForm] = Form.useForm();

  const form = topForm || currentForm;
  const allFormItems: Record<string, any> = useMemo(() => ({ ...defaultFormItems, ...formItems }), [
    formItems,
  ]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    // 初始化时校验默认数据是否合法
    if (validateInitial) {
      form.validateFields();
    }
  }, []);

  return (
    <Form form={form} {...restFormProps}>
      {items.map(({ name, formType, formProps, ...itemProps }) => {
        const FormItemComponent = allFormItems[formType];
        return (
          <Form.Item key={name} name={name} {...itemProps}>
            {FormItemComponent && <FormItemComponent {...formProps} />}
          </Form.Item>
        );
      })}
      {children}
    </Form>
  );
};

AxeForm.useForm = Form.useForm;
AxeForm.Item = Form.Item;

export default AxeForm;
