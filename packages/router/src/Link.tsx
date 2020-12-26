import React from 'react';
import { useRouter } from './core';

export interface LinkProps
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  to: string;
}

const Link: React.FC<LinkProps> = ({ to, style, onClick, children, ...restProps }) => {
  const [, setPath] = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    onClick?.(e);
    setPath(to);
  };

  return (
    <a
      style={{
        color: '#61dafb',
        cursor: 'pointer',
        ...style,
      }}
      onClick={handleClick}
      {...restProps}
    >
      {children}
    </a>
  );
};

export default Link;
