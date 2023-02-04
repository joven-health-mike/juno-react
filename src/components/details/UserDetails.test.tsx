/**
 * @jest-environment jsdom
 */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';
import { render } from '@testing-library/react';
import UserDetails from './UserDetails';
import { Role } from '../../services/user.service';

const testUser = {
  id: 'abcdefg',
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email@test.com',
  username: 'username',
  phone: 'phone',
  timeZoneIanaName: 'America/Denver',
  role: 'JOVEN_STAFF' as Role,
};

describe('UserDetails', () => {
  it('should display name', async () => {
    const view = render(<UserDetails user={testUser} />);
    const nameView = await view.findByTestId('name');
    expect(nameView.innerHTML).toEqual(
      testUser.firstName + ' ' + testUser.lastName
    );
  });
  it('should display email as a string', async () => {
    const view = render(<UserDetails user={testUser} />);
    const emailView = await view.findByTestId('email');
    expect(emailView.innerHTML).toEqual('Email: ' + testUser.email.toString());
  });

  it('should display the user role', async () => {
    const view = render(<UserDetails user={testUser} />);
    const userRoleView = await view.findByTestId('userRole');
    expect(userRoleView.innerHTML).toEqual('Role: ' + testUser.role.toString());
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
  it('should display the role as <p>', async () => {
    const view = render(<UserDetails user={testUser} />);
    const roleView = await view.findByTestId('userRole');
    expect(roleView.nodeName.toLowerCase()).toEqual('p');
  });
});
