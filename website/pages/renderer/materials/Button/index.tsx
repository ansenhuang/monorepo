import React from 'react';
import { Button } from 'antd';

export interface MyButtonProps {
  [key: string]: any;
}

const MyButton: React.FC<MyButtonProps> = ({ block = true, ...restProps }) => {
  return <Button block={block} {...restProps} />;
};

export default MyButton;
