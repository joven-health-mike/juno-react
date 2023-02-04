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
  address: '1234 Main St',
  city: 'Phoenix',
  state: 'AZ',
  zip: '80013',
  primaryEmail: 'email@test.com',
  primaryPhone: '234-123-2349',
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
  test('a new school should have an ID of -1', async () => {
    const submitCallback = jest.fn();
    const view = render(
      <CreateSchoolForm onSubmit={submitCallback} onCancel={jest.fn()} />
    );
    //add name
    const inputName = (await view.findByTestId(
      'input-name'
    )) as HTMLInputElement;
    inputName.value = 'name';

    const inputAddress = (await view.findByTestId(
      'input-address'
    )) as HTMLInputElement;
    inputAddress.value = '1234 Main St';

    const inputCity = (await view.findByTestId(
      'input-city'
    )) as HTMLInputElement;
    inputCity.value = 'Phoenix';

    const inputState = (await view.findByTestId(
      'input-state'
    )) as HTMLInputElement;
    inputState.value = 'AZ';

    const inputZip = (await view.findByTestId('input-zip')) as HTMLInputElement;
    inputZip.value = '80013';

    const inputEmail = (await view.findByTestId(
      'input-email'
    )) as HTMLInputElement;
    inputEmail.value = 'email@test.com';

    const inputPhone = (await view.findByTestId(
      'input-phone'
    )) as HTMLInputElement;
    inputPhone.value = '234-123-2349';

    //click submit button
    const button = await view.findByTestId('button-submit');
    fireEvent.click(button);

    //check that the ID is positive
    expect(submitCallback.mock.calls[0][0].id).toBe('-1');
  });

  test('Check if names match', () => {
    expect(testSchool.name).toBe('name');
  });

  test('Check if emails match', () => {
    expect(testSchool.primaryEmail).toBe('email@test.com');
  });
});
