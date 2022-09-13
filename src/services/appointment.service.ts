import { AxiosResponse } from 'axios';
import { Appointment } from '../data/appointments';
import { HttpServer } from './http-common';
import { Service } from './service';

// TODO: delegate to a Service implementation configured by environment with api endpoint.
class AppointmentService implements Service<Appointment> {
  getAll(): Promise<AxiosResponse<Appointment[]>> {
    return HttpServer.get<Array<Appointment>>('/appointments');
  }

  get(id: string): Promise<AxiosResponse<Appointment, any>> {
    return HttpServer.get<Appointment>(`/appointments/${id}`);
  }

  create(data: Appointment): Promise<AxiosResponse<Appointment>> {
    return HttpServer.post<Appointment>('/appointments', data);
  }

  update(
    data: Appointment,
    id: string
  ): Promise<AxiosResponse<Appointment, any>> {
    return HttpServer.put<Appointment>(`/appointments/${id}`, data);
  }

  delete(id: string): Promise<AxiosResponse<Appointment, any>> {
    return HttpServer.delete<Appointment>(`/appointments/${id}`);
  }
}
