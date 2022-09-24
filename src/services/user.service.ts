import { AxiosResponse } from 'axios';
import { User } from '../data/users';
import { HttpServer } from './http-common';
import { Service } from './service';

export const UserService: Service<User> = {
  getAll(): Promise<AxiosResponse<User[]>> {
    return HttpServer.get<User[]>('/users');
  },

  get(id: string): Promise<AxiosResponse<User, any>> {
    return HttpServer.get<User>(`/users/${id}`);
  },

  create(data: User): Promise<AxiosResponse<User>> {
    return HttpServer.post<User>('/users', data);
  },

  update(data: User, id: string): Promise<AxiosResponse<User, any>> {
    return HttpServer.put<User>(`/users/${id}`, data);
  },

  delete(id: string): Promise<AxiosResponse<User, any>> {
    return HttpServer.delete<User>(`/users/${id}`);
  },
};
