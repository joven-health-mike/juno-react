import { AxiosResponse } from 'axios';
import { Counselor } from '../data/counselors';
import { Student } from '../data/students';
import { User } from '../data/users';
import { HttpServer } from './http-common';
import { Service } from './service';

export class UserService implements Service<User> {
  getAll(): Promise<AxiosResponse<User[]>> {
    return HttpServer.get<User[]>('/users');
  }

  get(id: string): Promise<AxiosResponse<User, any>> {
    return HttpServer.get<User>(`/users/${id}`);
  }

  create(data: User): Promise<AxiosResponse<User>> {
    return HttpServer.post<User>('/users', data);
  }

  update(data: User, id: string): Promise<AxiosResponse<User, any>> {
    return HttpServer.put<User>(`/users/${id}`, data);
  }

  delete(id: string): Promise<AxiosResponse<User, any>> {
    return HttpServer.delete<User>(`/users/${id}`);
  }

  // Unique to UserService!
  getAllByRole(role: Role): Promise<AxiosResponse<RoleUser[]>> {
    return HttpServer.get<RoleUser[]>(`/users/role/${role}`);
  }
}

export type RoleUser = Counselor | Student; // JovenAdmin etc.

export type Role =
  | 'JOVEN_ADMIN'
  | 'JOVEN_STAFF'
  | 'SCHOOL_ADMIN'
  | 'SCHOOL_STAFF'
  | 'STUDENT'
  | 'TEACHER'
  | 'GUARDIAN'
  | 'COUNSELOR'
  | 'SYSADMIN'
  | 'UNASSIGNED';

export const ROLES = [
  'JOVEN_ADMIN',
  'JOVEN_STAFF',
  'SCHOOL_ADMIN',
  'SCHOOL_STAFF',
  'STUDENT',
  'TEACHER',
  'GUARDIAN',
  'COUNSELOR',
  'SYSADMIN',
  'UNASSIGNED',
];
