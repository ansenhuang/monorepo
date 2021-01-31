import React from 'react';
import { Button } from 'antd';

export interface MyButtonProps {
  text: string;
}

const MyButton: React.FC<MyButtonProps> = ({ text }) => {
  return (
    <Button type="primary" block>
      {text}
    </Button>
  );
};

export default MyButton;
