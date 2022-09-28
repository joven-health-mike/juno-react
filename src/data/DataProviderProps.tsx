import { ReactNode } from 'react';

export type DataProviderProps<T> = {
  data: T;
  children?: ReactNode | undefined;
};
