import { AxiosResponse } from 'axios';

export interface Service<T> {
  getAll: () => Promise<AxiosResponse<T | T[]>>;
  get: (id: string) => Promise<AxiosResponse<T, any>>;
  create: (data: T) => Promise<AxiosResponse<T>>;
  update: (data: T, id: string) => Promise<AxiosResponse<T, any>>;
  delete: (id: string) => Promise<AxiosResponse<T>>;
}
