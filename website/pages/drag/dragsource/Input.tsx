import React from 'react';
import { Input } from 'antd';

export interface MyInputProps {
  value?: string;
}

const MyInput: React.FC<MyInputProps> = ({ value }) => {
  return <Input value={value} />;
};

export default MyInput;
