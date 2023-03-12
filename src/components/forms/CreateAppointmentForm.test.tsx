/**
 * @jest-environment jsdom
 */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '@testing-library/react';
import CreateAppointmentForm from './CreateAppointmentForm';
import { emptySchool, SchoolsContext, School } from '../../data/schools';
import { UsersContext, User } from '../../data/users';

const fakeAppointment = {
  id: '0',
  title: 'CLINICAL',
  start: new Date(),
  end: new Date(),
  isRecurring: false,
  recurranceInfo: undefined,
  school: emptySchool,
  schoolId: '-1',
  participants: [],
  type: 'CLINICAL',
  status: 'SCHEDULED',
  location: 'UNKNOWN',
};

const usersData = [
  {
    email: 'randi@jovenhealth.com',
    firstName: 'Randi',
    id: '111111222222333333',
    lastName: 'De Angelis',
    role: 'COUNSELOR',
    timeZoneIanaName: 'America/New_York',
    username: 'randi.de.angelis',
  },
  {
    id: '00352',
    firstName: 'First',
    lastName: 'Student',
    email: 'firststudent@mail.com',
    username: 'firststudent',
    phone: '000-000-0000',
    docsUrl: 'https://student.com',
    timeZoneIanaName: 'America/Denver',
    role: 'STUDENT',
    studentStatus: 'ACTIVE',
  },
] as User[];

const schoolsData = [
  {
    id: '123',
    name: 'Test School',
    address: '123 test school lane',
    city: 'Anywhere',
    state: 'CO',
    zip: '12345',
    primaryEmail: 'schools@mail.com',
    primaryPhone: '123-456-7890',
    docsUrl: 'https://schools.com',
  },
] as School[];

const usersValue = {
  data: usersData,
  getAll: () => null,
  get: (id: string) => null,
  add: (user: User) => null,
  update: (user: User) => null,
  delete: (user: User) => null,
};

const schoolsValue = {
  data: schoolsData,
  getAll: () => null,
  get: (id: string) => null,
  add: (school: School) => null,
  update: (school: School) => null,
  delete: (school: School) => null,
};

describe('CreateAppointmentForm', () => {
  beforeEach(() => {
    const oldGlobalDate = global.Date;
    const mockDate = new Date(2023, 1, 1, 12, 0, 0);
    jest
      .spyOn(global, 'Date')
      .mockImplementation(() => mockDate as unknown as string);
    global.Date.UTC = oldGlobalDate.UTC;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should submit defaultAppointment if nothing is changed', () => {
    const submitCallback = jest.fn();
    render(
      <CreateAppointmentForm
        defaultAppointment={fakeAppointment}
        onSubmit={submitCallback}
        onCancel={jest.fn()}
      />
    );

    // click submit button
    const button = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(button);

    expect(submitCallback).toHaveBeenCalledWith(fakeAppointment);
  });
  it('cancel button calls onCancel callback', () => {
    const cancelCallback = jest.fn();
    render(
      <CreateAppointmentForm onSubmit={jest.fn()} onCancel={cancelCallback} />
    );

    // click cancel button
    const button = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(button);

    expect(cancelCallback).toHaveBeenCalled();
  });
  it('should submit form values for new appointment', async () => {
    const submitCallback = jest.fn();
    render(
      <SchoolsContext.Provider value={schoolsValue}>
        <UsersContext.Provider value={usersValue}>
          <CreateAppointmentForm
            onSubmit={submitCallback}
            onCancel={jest.fn()}
          />
        </UsersContext.Provider>
      </SchoolsContext.Provider>
    );

    const durationSelect = screen.getByRole('combobox', {
      name: 'Duration:',
    });
    userEvent.selectOptions(durationSelect, '30');

    const counselorSelect = screen.getByRole('combobox', {
      name: 'Counselor:',
    });
    userEvent.selectOptions(counselorSelect, 'Randi De Angelis');

    const schoolSelect = screen.getByRole('combobox', {
      name: 'School:',
    });
    userEvent.selectOptions(schoolSelect, 'Test School');

    const typeSelect = screen.getByRole('combobox', {
      name: 'Type:',
    });
    userEvent.selectOptions(typeSelect, 'Clinical');

    const statusSelect = screen.getByRole('combobox', {
      name: 'Status:',
    });
    userEvent.selectOptions(statusSelect, 'SCHEDULED');

    const button = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(button);

    expect(submitCallback).toHaveBeenCalledWith({
      start: new Date('2023-02-01T19:00:00.000Z'),
      end: new Date('2023-02-01T19:30:00.000Z'),
      counselorId: '',
      counselorUserId: '111111222222333333',
      frequency: 'WEEKS',
      id: '-1',
      isRecurring: false,
      location: 'UNKNOWN',
      numOccurrences: 4,
      numRepeats: 1,
      participants: [],
      schoolId: '123',
      status: 'SCHEDULED',
      title: '(Test School) - CLINICAL',
      type: 'CLINICAL',
    });
  });
  it('should submit form values for recurring appointment', () => {
    const submitCallback = jest.fn();
    render(
      <SchoolsContext.Provider value={schoolsValue}>
        <UsersContext.Provider value={usersValue}>
          <CreateAppointmentForm
            onSubmit={submitCallback}
            onCancel={jest.fn()}
          />
        </UsersContext.Provider>
      </SchoolsContext.Provider>
    );

    const durationSelect = screen.getByRole('combobox', {
      name: 'Duration:',
    });
    userEvent.selectOptions(durationSelect, '30');

    const counselorSelect = screen.getByRole('combobox', {
      name: 'Counselor:',
    });
    userEvent.selectOptions(counselorSelect, 'Randi De Angelis');

    const schoolSelect = screen.getByRole('combobox', {
      name: 'School:',
    });
    userEvent.selectOptions(schoolSelect, 'Test School');

    const typeSelect = screen.getByRole('combobox', {
      name: 'Type:',
    });
    userEvent.selectOptions(typeSelect, 'Clinical');

    const statusSelect = screen.getByRole('combobox', {
      name: 'Status:',
    });
    userEvent.selectOptions(statusSelect, 'SCHEDULED');

    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);

    const repeatFor = screen.getByTestId('repeatForNum');
    const numOccurrences = screen.getByTestId('numOccurrences');
    // using fireEvent.change because userEvent.type
    // treats repeatForNum and numOccurrences as if they were the same input
    fireEvent.change(repeatFor, { target: { value: 2 } });
    fireEvent.change(numOccurrences, { target: { value: 6 } });

    const button = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(button);

    expect(submitCallback).toHaveBeenCalledWith({
      start: new Date('2023-02-01T19:00:00.000Z'),
      end: new Date('2023-02-01T19:30:00.000Z'),
      counselorId: '',
      counselorUserId: '111111222222333333',
      frequency: 'WEEKS',
      id: '-1',
      isRecurring: true,
      location: 'UNKNOWN',
      numOccurrences: 6,
      numRepeats: 2,
      participants: [],
      schoolId: '123',
      status: 'SCHEDULED',
      title: '(Test School) - CLINICAL',
      type: 'CLINICAL',
    });
  });
});
