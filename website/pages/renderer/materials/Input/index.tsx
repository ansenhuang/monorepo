import React from 'react';
import { Input } from 'antd';

export interface MyInputProps {
  [key: string]: any;
}

const MyInput: React.FC<MyInputProps> = (props) => {
  return <Input {...props} />;
};

export default MyInput;
