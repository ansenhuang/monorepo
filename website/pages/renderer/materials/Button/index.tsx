import React from 'react';
import { Button } from 'antd';
import type { ButtonProps } from 'antd/lib/button';

export interface MyButtonProps {
  type?: ButtonProps['type'];
  children: string;
}

const MyButton: React.FC<MyButtonProps> = ({ type, children }) => {
  return (
    <Button type={type} block>
      {children}
    </Button>
  );
};

export default MyButton;
