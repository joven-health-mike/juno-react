/**
 * @jest-environment jsdom
 */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '@testing-library/react';
import CreateUserForm from './CreateUserForm';
import { Role } from '../../services/user.service';

const testUser = {
  id: 'abcdefg',
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email@test.com',
  username: 'username',
  phone: 'phone',
  docsUrl: 'https://docs.com',
  timeZoneIanaName: 'timeZoneIanaName',
  role: 'JOVEN_STAFF' as Role,
};

describe('CreateUserForm', () => {
  it('Should submit default user if nothing has changed', () => {
    const submitCallback = jest.fn();
    render(
      <CreateUserForm
        defaultUser={testUser}
        onSubmit={submitCallback}
        onCancel={jest.fn()}
      />
    );

    // click submit button
    const button = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(button);

    expect(submitCallback).toHaveBeenCalledWith(testUser);
  });
  test('Cancel button calls onCancel callback', () => {
    const cancelCallback = jest.fn();
    render(<CreateUserForm onSubmit={jest.fn()} onCancel={cancelCallback} />);

    const button = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(button);

    expect(cancelCallback).toHaveBeenCalled();
  });
  test('a new user should have a positive ID', () => {
    const submitCallback = jest.fn();
    render(<CreateUserForm onSubmit={submitCallback} onCancel={jest.fn()} />);
    //add name
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
    userEvent.type(inputPhone, 'phone');

    const inputDocsUrl = screen.getByRole('textbox', {
      name: 'Docs URL:',
    }) as HTMLInputElement;
    userEvent.type(inputDocsUrl, 'https://docs.com');

    //click submit button
    const button = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(button);

    //check that the ID is -1
    expect(submitCallback.mock.calls[0][0].id).toBe('-1');
  });
});
