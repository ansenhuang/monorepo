import React from 'react';
import styled from 'styled-components/macro';
import { formateDate, DateObject } from '@huangancheng/shared';

export interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export interface Test extends DateObject {
  id: number | string;
}

export const StyledButton = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  transform: scale(1);
`;

const Button: React.FC<ButtonProps> = ({ className, children }) => {
  return (
    <StyledButton className={className}>
      {children} - {formateDate(new Date())}
    </StyledButton>
  );
};

export default Button;
