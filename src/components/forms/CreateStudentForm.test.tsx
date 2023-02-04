/**
 * @jest-environment jsdom
 */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';
import { fireEvent, render } from '@testing-library/react';
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
  role: 'JOVEN_STAFF' as Role,
  studentStatus: 'ACTIVE' as StudentStatus,
};

describe('CreateStudentForm', () => {
  it('Should submit default student if nothing has changed', async () => {
    const submitCallback = jest.fn();
    const view = render(
      <CreateStudentForm
        defaultStudent={testStudent}
        onSubmit={submitCallback}
        onCancel={jest.fn()}
      />
    );

    //add name
    const inputFirstName = (await view.findByTestId(
      'input-first-name'
    )) as HTMLInputElement;
    inputFirstName.value = 'firstName';

    const inputLastName = (await view.findByTestId(
      'input-last-name'
    )) as HTMLInputElement;
    inputLastName.value = 'lastName';

    const inputEmail = (await view.findByTestId(
      'input-email'
    )) as HTMLInputElement;
    inputEmail.value = 'email@test.com';

    const inputUsername = (await view.findByTestId(
      'input-username'
    )) as HTMLInputElement;
    inputUsername.value = 'username';

    const inputPhone = (await view.findByTestId(
      'input-phone'
    )) as HTMLInputElement;
    inputPhone.value = '240-204-1492';

    const inputDocsUrl = (await view.findByTestId(
      'input-docsUrl'
    )) as HTMLInputElement;
    inputDocsUrl.value = 'https://docs.com';

    // click submit button
    const button = await view.findByTestId('button-submit');
    fireEvent.click(button);

    expect(submitCallback).toHaveBeenCalledWith(testStudent);
  });
  test('Cancel button calls onCancel callback', async () => {
    const cancelCallback = jest.fn();
    const view = render(
      <CreateStudentForm onSubmit={jest.fn()} onCancel={cancelCallback} />
    );

    const button = await view.findByTestId('button-cancel');
    fireEvent.click(button);

    expect(cancelCallback).toHaveBeenCalled();
  });

  test('Check if first names match', () => {
    expect(testStudent.firstName).toBe('firstName');
  });

  test('Check if last names match', () => {
    expect(testStudent.lastName).toBe('lastName');
  });
});
