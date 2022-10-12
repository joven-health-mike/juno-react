/**
 * @jest-environment jsdom
 */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import CreateUserForm from './CreateUserForm';
import { Role } from '../../services/user.service';

const testUser = {
  id: 'abcdefg',
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email@test.com',
  username: 'username',
  phone: 'phone',
  role: 'JOVEN_STAFF' as Role,
};

describe('CreateUserForm', () => {
  it('Should submit default user if nothing has changed', async () => {
    const submitCallback = jest.fn();
    const view = render(
      <CreateUserForm
        defaultUser={testUser}
        onSubmit={submitCallback}
        onCancel={jest.fn()}
      />
    );

    // click submit button
    const button = await view.findByTestId('button-submit');
    fireEvent.click(button);

    expect(submitCallback).toHaveBeenCalledWith(testUser);
  });
  test('Cancel button calls onCancel callback', async () => {
    const cancelCallback = jest.fn();
    const view = render(
      <CreateUserForm onSubmit={jest.fn()} onCancel={cancelCallback} />
    );

    const button = await view.findByTestId('button-cancel');
    fireEvent.click(button);

    expect(cancelCallback).toHaveBeenCalled();
  });
  test('a new user should have a positive ID', async () => {
    const submitCallback = jest.fn();
    const view = render(
      <CreateUserForm onSubmit={submitCallback} onCancel={jest.fn()} />
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

    const inputPassword = (await view.findByTestId(
      'input-password'
    )) as HTMLInputElement;
    inputPassword.value = 'password';

    //click submit button
    const button = await view.findByTestId('button-submit');
    fireEvent.click(button);

    //check that the ID is positive
    expect(submitCallback.mock.calls[0][0].id).toBeGreaterThanOrEqual(0);
  });

  test('Check if first names match', () => {
    expect(testUser.firstName).toBe('firstName');
  });

  test('Check if last names match', () => {
    expect(testUser.lastName).toBe('lastName');
  });

  test('Check if emails match', () => {
    expect(testUser.email).toBe('email@test.com');
  });

  test('Check if usernames match', () => {
    expect(testUser.username).toBe('username');
  });

  test('Check if phones match', () => {
    expect(testUser.phone).toBe('phone');
  });

  test('Check if roles match', () => {
    expect(testUser.role).toBe('userRole');
  });
});
