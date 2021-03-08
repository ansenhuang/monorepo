import React from 'react';
import { Input } from 'antd';

export interface MyInputProps {
  [key: string]: any;
}

const MyInput: React.FC<MyInputProps> = ({ onChange, ...restProps }) => {
  return <Input {...restProps} onChange={(e) => onChange(e.target.value)} />;
};

export default MyInput;
