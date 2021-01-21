import { createContext, useContext } from 'react';

const RootContext = createContext<any>({});

export const RootProvider = RootContext.Provider;
export const useRootState = <T = any>(key: string): [T, (newState: T) => void] => {
  const context = useContext(RootContext);
  return context[key] || [null, () => {}];
};
