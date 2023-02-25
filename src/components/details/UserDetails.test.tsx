/**
 * @jest-environment jsdom
 */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';
import { render, screen } from '@testing-library/react';
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
  const renderComponent = () => render(<UserDetails user={testUser} />);

  it('should display name', () => {
    renderComponent();
    const nameView = screen.getByText(
      `${testUser.firstName} ${testUser.lastName}`
    );
    expect(nameView).not.toBeNull();
  });
  it('should display email as a string', () => {
    renderComponent();
    const emailView = screen.getByText(`Email: ${testUser.email.toString()}`);
    expect(emailView).not.toBeNull();
  });

  it('should display the user role', () => {
    renderComponent();
    const userRoleView = screen.getByText(`Role: ${testUser.role.toString()}`);
    expect(userRoleView).not.toBeNull();
  });
});
