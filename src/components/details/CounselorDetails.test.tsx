/**
 * @jest-environment jsdom
 */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';
import { render } from '@testing-library/react';
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
  it('should display name', async () => {
    const view = render(<CounselorDetails counselor={testCounselor} />);
    const nameView = await view.findByTestId('name');
    expect(nameView.innerHTML).toEqual(
      `${testCounselor.firstName} ${testCounselor.lastName}`
    );
  });
  it('should display email as a string', async () => {
    const view = render(<CounselorDetails counselor={testCounselor} />);
    const emailView = await view.findByTestId('email');
    expect(emailView.innerHTML).toEqual(
      'Email: ' + testCounselor.email.toString()
    );
  });
  it('should display the room link as a  string', async () => {
    const view = render(<CounselorDetails counselor={testCounselor} />);
    const roomLinkView = await view.findByTestId('roomLink');
    expect(roomLinkView.innerHTML).toEqual(
      `Room Link: <a href="${testCounselor.counselorRoomLink}">${testCounselor.counselorRoomLink}</a>`
    );
  });
  it('should display name as <h2>', async () => {
    const view = render(<CounselorDetails counselor={testCounselor} />);
    const nameView = await view.findByTestId('name');
    expect(nameView.nodeName.toLowerCase()).toEqual('h2');
  });
  it('should display email as <p>', async () => {
    const view = render(<CounselorDetails counselor={testCounselor} />);
    const emailView = await view.findByTestId('email');
    expect(emailView.nodeName.toLowerCase()).toEqual('p');
  });
  it('should display the room link as <p>', async () => {
    const view = render(<CounselorDetails counselor={testCounselor} />);
    const roomLinkView = await view.findByTestId('roomLink');
    expect(roomLinkView.nodeName.toLowerCase()).toEqual('p');
  });
});
