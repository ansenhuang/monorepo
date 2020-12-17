import React, { createContext, useContext } from 'react';

interface RouterContextValue {
  pathname: string;
  setPathname: (pathname: string) => void;
}

export const RouterContext = createContext<RouterContextValue>({
  pathname: '',
  setPathname: () => {},
});

export const useRouter = (): [string, (url: string) => void] => {
  const { pathname, setPathname } = useContext(RouterContext);
  return [
    pathname,
    (url: string) => {
      window.history.pushState(null, '', url);
      setPathname(url);
    },
  ];
};

interface LinkProps
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  to: string;
}
export const Link: React.FC<LinkProps> = ({ to, style, onClick, children, ...restProps }) => {
  const [, setPathname] = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    onClick?.(e);
    setPathname(to);
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
