import React from 'react';
import { Input } from 'antd';

export interface MyInputProps {
  placeholder?: string;
}

const MyInput: React.FC<MyInputProps> = ({ placeholder }) => {
  return <Input placeholder={placeholder} />;
};

export default MyInput;
