/**
 * @jest-environment jsdom
 */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '@testing-library/react';
import CreateStudentForm from './CreateStudentForm';
import { Student, StudentStatus } from '../../data/students';
import { Role } from '../../services/user.service';

const testStudent: Student = {
  firstName: 'firstName',
  lastName: 'lastName',
  id: '-1',
  email: 'email@test.com',
  username: 'username',
  phone: '240-204-1492',
  docsUrl: 'https://docs.com',
  timeZoneIanaName: 'America/New_York',
  role: 'STUDENT' as Role,
  studentStatus: 'ACTIVE' as StudentStatus,
};

describe('CreateStudentForm', () => {
  it('Should submit default student if nothing has changed', () => {
    const submitCallback = jest.fn();
    render(
      <CreateStudentForm
        defaultStudent={testStudent}
        onSubmit={submitCallback}
        onCancel={jest.fn()}
      />
    );

    const button = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(button);
    expect(submitCallback).toHaveBeenCalledWith(testStudent);
  });
  test('Cancel button calls onCancel callback', () => {
    const cancelCallback = jest.fn();
    render(
      <CreateStudentForm onSubmit={jest.fn()} onCancel={cancelCallback} />
    );

    const button = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(button);

    expect(cancelCallback).toHaveBeenCalled();
  });
  it('Should submit form values for new student', () => {
    const submitCallback = jest.fn();
    render(
      <CreateStudentForm onSubmit={submitCallback} onCancel={jest.fn()} />
    );

    const inputFirstName = screen.getByRole('textbox', {
      name: 'First Name:',
    }) as HTMLInputElement;
    userEvent.type(inputFirstName, 'firstName');

    const inputLastName = screen.getByRole('textbox', {
      name: 'Last Name:',
    }) as HTMLInputElement;
    userEvent.type(inputLastName, 'lastName');

    const inputEmail = screen.getByRole('textbox', {
      name: 'Email:',
    }) as HTMLInputElement;
    userEvent.type(inputEmail, 'email@test.com');

    const inputUsername = screen.getByRole('textbox', {
      name: 'Username:',
    }) as HTMLInputElement;
    userEvent.type(inputUsername, 'username');

    const inputPhone = screen.getByRole('textbox', {
      name: 'Phone:',
    }) as HTMLInputElement;
    userEvent.type(inputPhone, '240-204-1492');

    const inputDocsUrl = screen.getByRole('textbox', {
      name: 'Docs URL:',
    }) as HTMLInputElement;
    userEvent.type(inputDocsUrl, 'https://docs.com');

    const selectTimeZone = screen.getByRole('combobox', { name: 'Time Zone:' });
    userEvent.selectOptions(selectTimeZone, ['America/New_York']);

    const selectStatus = screen.getByRole('combobox', { name: 'Status:' });
    userEvent.selectOptions(selectStatus, ['ACTIVE']);

    const button = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(button);

    expect(submitCallback).toHaveBeenCalledWith(testStudent);
  });
});
