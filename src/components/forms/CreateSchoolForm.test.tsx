/**
 * @jest-environment jsdom
 */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '@testing-library/react';
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
  docsUrl: 'https://zoomtest.com',
};

describe('CreateSchoolForm', () => {
  it('Should submit default school if nothing has changed', () => {
    const submitCallback = jest.fn();
    render(
      <CreateSchoolForm
        defaultSchool={testSchool}
        onSubmit={submitCallback}
        onCancel={jest.fn()}
      />
    );

    // click submit button
    const button = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(button);

    expect(submitCallback).toHaveBeenCalledWith(testSchool);
  });
  test('Cancel button calls onCancel callback', () => {
    const cancelCallback = jest.fn();
    render(<CreateSchoolForm onSubmit={jest.fn()} onCancel={cancelCallback} />);

    const button = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(button);

    expect(cancelCallback).toHaveBeenCalled();
  });
  test('a new school should have an ID of -1', () => {
    const submitCallback = jest.fn();
    render(<CreateSchoolForm onSubmit={submitCallback} onCancel={jest.fn()} />);
    //add name
    const inputName = screen.getByRole('textbox', {
      name: 'Name:',
    }) as HTMLInputElement;
    userEvent.type(inputName, 'name');

    const inputAddress = screen.getByRole('textbox', {
      name: 'Address:',
    }) as HTMLInputElement;
    userEvent.type(inputAddress, '1234 Main St');

    const inputCity = screen.getByRole('textbox', {
      name: 'City:',
    }) as HTMLInputElement;
    userEvent.type(inputCity, 'Phoenix');

    const inputState = screen.getByRole('textbox', {
      name: 'State:',
    }) as HTMLInputElement;
    userEvent.type(inputState, 'AZ');

    const inputZip = screen.getByRole('textbox', {
      name: 'Zip Code:',
    }) as HTMLInputElement;
    userEvent.type(inputZip, '80013');

    const inputEmail = screen.getByRole('textbox', {
      name: 'Email:',
    }) as HTMLInputElement;
    userEvent.type(inputEmail, 'email@test.com');

    const inputPhone = screen.getByRole('textbox', {
      name: 'Phone Number:',
    }) as HTMLInputElement;
    userEvent.type(inputPhone, '234-123-2349');

    const inputDocsUrl = screen.getByRole('textbox', {
      name: 'Docs URL:',
    }) as HTMLInputElement;
    userEvent.type(inputDocsUrl, 'https://zoomtest.com');

    //click submit button
    const button = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(button);

    //check that the ID is positive
    expect(submitCallback.mock.calls[0][0].id).toBe('-1');
  });
});
