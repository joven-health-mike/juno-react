import { AxiosResponse } from 'axios';
import { User } from '../data/users';
import { HttpServer } from './http-common';
import { Service } from './service';

export class LoggedInUserService implements Service<User> {
  getAll(): Promise<AxiosResponse<User>> {
    return HttpServer.get<User>('/loggedInUser');
  }

  get(id: string): Promise<AxiosResponse<User, any>> {
    return HttpServer.get<User>(`/loggedInUser/${id}`);
  }

  create(data: User): Promise<AxiosResponse<User>> {
    return HttpServer.post<User>('/loggedInUser', data);
  }

  update(data: User, id: string): Promise<AxiosResponse<User, any>> {
    return HttpServer.put<User>(`/loggedInUser/${id}`, data);
  }

  delete(id: string): Promise<AxiosResponse<User, any>> {
    return HttpServer.delete<User>(`/loggedInUser/${id}`);
  }
}
