import React, { createContext, useContext, useState, useEffect } from 'react';

const getCurrentPath = () => window.location.pathname;
const initialPath = getCurrentPath();

interface RouterContextValue {
  path: string;
  setPath: (url: string) => void;
}
const RouterContext = createContext<RouterContextValue>({
  path: initialPath,
  setPath: () => {},
});

export const useRouter = (): [string, (path: string) => void] => {
  const { path, setPath } = useContext(RouterContext);
  return [
    path,
    (nextPath: string) => {
      window.history.pushState(null, '', nextPath);
      setPath(nextPath);
    },
  ];
};

interface RouterProps {}
export const Router: React.FC<RouterProps> = ({ children }) => {
  const [path, setPath] = useState(initialPath);

  useEffect(() => {
    const onHistoryChange = (e: PopStateEvent) => {
      setPath(getCurrentPath());
    };
    window.addEventListener('popstate', onHistoryChange);
    return () => {
      window.removeEventListener('popstate', onHistoryChange);
    };
  }, []);

  return <RouterContext.Provider value={{ path, setPath }}>{children}</RouterContext.Provider>;
};

interface RouteProps {
  path: string;
  children?: React.ReactElement<any, any> | null;
}
export const Route: React.FC<RouteProps> = ({ path, children }) => {
  const { path: contextPath } = useContext(RouterContext);
  if (path !== contextPath) {
    return null;
  }
  return children || null;
};

interface LinkProps
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  to: string;
}
export const Link: React.FC<LinkProps> = ({ to, style, onClick, children, ...restProps }) => {
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
