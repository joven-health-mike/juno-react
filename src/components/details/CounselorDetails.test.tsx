/**
 * @jest-environment jsdom
 */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';
import { render } from '@testing-library/react';
import CounselorDetails from './CounselorDetails';
import { emptyUser } from '../../data/users';

const testCounselor = {
  name: 'name',
  _id: 0,
  email: 'email@test.com',
  roomLink: 'https://www.zoomtest.com',
  user: emptyUser,
};

describe('CounselorDetails', () => {
  it('should display name', async () => {
    const view = render(<CounselorDetails counselor={testCounselor} />);
    const nameView = await view.findByTestId('name');
    expect(nameView.innerHTML).toEqual(testCounselor.name);
  });
  it('should display ID as a string', async () => {
    const view = render(<CounselorDetails counselor={testCounselor} />);
    const idView = await view.findByTestId('id');
    expect(idView.innerHTML).toEqual('ID: ' + testCounselor._id.toString());
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
      'Room Link: ' + testCounselor.roomLink.toString()
    );
  });
  it('should display ID as <p>', async () => {
    const view = render(<CounselorDetails counselor={testCounselor} />);
    const idView = await view.findByTestId('id');
    expect(idView.nodeName.toLowerCase()).toEqual('p');
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
