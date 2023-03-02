/**
 * @jest-environment jsdom
 */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';
import { render, screen } from '@testing-library/react';
import CounselorDetails from './CounselorDetails';
import { Role } from '../../services/user.service';

const testCounselor = {
  id: '0',
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email@test.com',
  username: '',
  phone: '',
  docsUrl: '',
  timeZoneIanaName: '',
  role: 'JOVEN_STAFF' as Role,
  counselorRoomLink: 'https://room.link',
};

describe('CounselorDetails', () => {
  const renderComponent = () =>
    render(<CounselorDetails counselor={testCounselor} />);

  it('should display name', () => {
    renderComponent();
    const nameView = screen.getByText(
      `${testCounselor.firstName} ${testCounselor.lastName}`
    );
    expect(nameView).not.toBeNull();
  });
  it('should display email as a string', () => {
    renderComponent();
    const emailView = screen.getByText(
      'Email: ' + testCounselor.email.toString()
    );
    expect(emailView).not.toBeNull();
  });
  it('should display the room link as a  string', () => {
    renderComponent();
    const roomLinkView = screen.getByRole('link', {
      name: testCounselor.counselorRoomLink,
    });
    expect(roomLinkView).not.toBeNull();
  });
});
