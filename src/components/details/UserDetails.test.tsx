/**
 * @jest-environment jsdom
 */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';
import { render } from '@testing-library/react';
import UserDetails from './UserDetails';

const testUser = {
  name: 'name',
  _id: 0,
  email: 'email@test.com',
  password: 'userPassword',
  role: 'userRole',
};

describe('UserDetails', () => {
  it('should display name', async () => {
    const view = render(<UserDetails user={testUser} />);
    const nameView = await view.findByTestId('name');
    expect(nameView.innerHTML).toEqual(testUser.name);
  });
  it('should display ID as a string', async () => {
    const view = render(<UserDetails user={testUser} />);
    const idView = await view.findByTestId('id');
    expect(idView.innerHTML).toEqual('ID: ' + testUser._id.toString());
  });
  it('should display email as a string', async () => {
    const view = render(<UserDetails user={testUser} />);
    const emailView = await view.findByTestId('email');
    expect(emailView.innerHTML).toEqual('Email: ' + testUser.email.toString());
  });
  it('should display the password as a string', async () => {
    const view = render(<UserDetails user={testUser} />);
    const passwordView = await view.findByTestId('userPassword');
    expect(passwordView.innerHTML).toEqual(
      'Password: ' + testUser.password.toString()
    );
  });

  it('should display the user role', async () => {
    const view = render(<UserDetails user={testUser} />);
    const userRoleView = await view.findByTestId('userRole');
    expect(userRoleView.innerHTML).toEqual('Role: ' + testUser.role.toString());
  });
  it('should display ID as <p>', async () => {
    const view = render(<UserDetails user={testUser} />);
    const idView = await view.findByTestId('id');
    expect(idView.nodeName.toLowerCase()).toEqual('p');
  });
  it('should display name as <h2>', async () => {
    const view = render(<UserDetails user={testUser} />);
    const nameView = await view.findByTestId('name');
    expect(nameView.nodeName.toLowerCase()).toEqual('h2');
  });
  it('should display email as <p>', async () => {
    const view = render(<UserDetails user={testUser} />);
    const emailView = await view.findByTestId('email');
    expect(emailView.nodeName.toLowerCase()).toEqual('p');
  });
  it('should display the password as <p>', async () => {
    const view = render(<UserDetails user={testUser} />);
    const passwordView = await view.findByTestId('userPassword');
    expect(passwordView.nodeName.toLowerCase()).toEqual('p');
  });
  it('should display the role as <p>', async () => {
    const view = render(<UserDetails user={testUser} />);
    const roleView = await view.findByTestId('userRole');
    expect(roleView.nodeName.toLowerCase()).toEqual('p');
  });
});
