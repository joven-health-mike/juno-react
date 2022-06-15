/**
 * @jest-environment jsdom
 */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import CreateStudentForm from './CreateStudentForm';

const testStudent = {
  first_name: 'firstName',
  last_name: 'lastName',
  _id: 0,
  schoolId: 1,
  counselorId: 2,
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
  test('a new student should have a positive ID', async () => {
    const submitCallback = jest.fn();
    const view = render(
      <CreateStudentForm onSubmit={submitCallback} onCancel={jest.fn()} />
    );
    //add name
    const inputFirstName = (await view.findByTestId(
      'firstName'
    )) as HTMLInputElement;
    inputFirstName.value = 'firstName';

    const inputLastName = (await view.findByTestId(
      'lastName'
    )) as HTMLInputElement;
    inputLastName.value = 'lastName';

    //click submit button
    const button = await view.findByTestId('button-submit');
    fireEvent.click(button);

    //check that the ID is positive
    expect(submitCallback.mock.calls[0][0]._id).toBeGreaterThanOrEqual(0);

    expect(submitCallback.mock.calls[1][1].schoolId).toBeGreaterThanOrEqual(1);

    expect(submitCallback.mock.calls[2][2].counselorId).toBeGreaterThanOrEqual(
      2
    );
  });

  test('Check if first names match', () => {
    expect(testStudent.first_name).toBe('firstName');
  });

  test('Check if last names match', () => {
    expect(testStudent.last_name).toBe('lastName');
  });
});
