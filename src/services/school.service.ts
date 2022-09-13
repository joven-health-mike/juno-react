import { AxiosResponse } from 'axios';
import { School } from '../data/schools';
import { HttpServer } from './http-common';

class SchoolService implements Service<School> {
  getAll(): Promise<AxiosResponse<School[]>> {
    return HttpServer.get<Array<School>>('/schools');
  }

  get(id: string): Promise<AxiosResponse<School, any>> {
    return HttpServer.get<School>(`/schools/${id}`);
  }

  create(data: School): Promise<AxiosResponse<School>> {
    return HttpServer.post<School>('/schools', data);
  }

  update(data: School, id: string): Promise<AxiosResponse<School, any>> {
    return HttpServer.put<School>(`/schools/${id}`, data);
  }

  delete(id: string): Promise<AxiosResponse<School, any>> {
    return HttpServer.delete<School>(`/schools/${id}`);
  }
}
