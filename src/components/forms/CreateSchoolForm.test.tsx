/**
 * @jest-environment jsdom
 */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import CreateSchoolForm from './CreateSchoolForm';

const testSchool = {
  id: '0',
  name: 'name',
  primaryEmail: 'email@test.com',
};

describe('CreateSchoolForm', () => {
  it('Should submit default school if nothing has changed', async () => {
    const submitCallback = jest.fn();
    const view = render(
      <CreateSchoolForm
        defaultSchool={testSchool}
        onSubmit={submitCallback}
        onCancel={jest.fn()}
      />
    );

    // click submit button
    const button = await view.findByTestId('button-submit');
    fireEvent.click(button);

    expect(submitCallback).toHaveBeenCalledWith(testSchool);
  });
  test('Cancel button calls onCancel callback', async () => {
    const cancelCallback = jest.fn();
    const view = render(
      <CreateSchoolForm onSubmit={jest.fn()} onCancel={cancelCallback} />
    );

    const button = await view.findByTestId('button-cancel');
    fireEvent.click(button);

    expect(cancelCallback).toHaveBeenCalled();
  });
  test('a new school should have a positive ID', async () => {
    const submitCallback = jest.fn();
    const view = render(
      <CreateSchoolForm onSubmit={submitCallback} onCancel={jest.fn()} />
    );
    //add name
    const inputName = (await view.findByTestId(
      'input-name'
    )) as HTMLInputElement;
    inputName.value = 'name';

    const inputEmail = (await view.findByTestId(
      'input-email'
    )) as HTMLInputElement;
    inputEmail.value = 'email@test.com';

    //click submit button
    const button = await view.findByTestId('button-submit');
    fireEvent.click(button);

    //check that the ID is positive
    expect(submitCallback.mock.calls[0][0].id).toBeGreaterThanOrEqual(0);
  });

  test('Check if names match', () => {
    expect(testSchool.name).toBe('name');
  });

  test('Check if emails match', () => {
    expect(testSchool.primaryEmail).toBe('email@test.com');
  });
});
