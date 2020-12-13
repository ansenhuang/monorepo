import React from 'react';
import styled from 'styled-components/macro';

export interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
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
  return <StyledButton className={className}>{children}</StyledButton>;
};

export default Button;
