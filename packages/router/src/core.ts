import { createContext, useContext } from 'react';

export const getCurrentPath = () => window.location.pathname;

interface RouterContextValue {
  path: string;
  setPath: (url: string) => void;
}

export const RouterContext = createContext<RouterContextValue>({
  path: getCurrentPath(),
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
