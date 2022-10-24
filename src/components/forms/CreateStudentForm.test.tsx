/**
 * @jest-environment jsdom
 */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import CreateStudentForm from './CreateStudentForm';
import { Student } from '../../data/students';
import { Role } from '../../services/user.service';

const testStudent: Student = {
  firstName: 'firstName',
  lastName: 'lastName',
  id: '0',
  email: '',
  username: '',
  phone: '',
  docsUrl: '',
  timeZoneIanaName: '',
  role: 'JOVEN_STAFF' as Role,
  studentRef: {
    id: '1',
    userId: '1',
    assignedSchoolId: '1',
    assignedCounselorId: '2',
    status: 'ACTIVE',
  },
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
