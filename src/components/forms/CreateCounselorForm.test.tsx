/**
 * @jest-environment jsdom
 */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '@testing-library/react';
import CreateCounselorForm from './CreateCounselorForm';
import { Role } from '../../services/user.service';
import { Counselor } from '../../data/counselors';

const testCounselor: Counselor = {
  id: '-1',
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email@test.com',
  username: 'username',
  phone: '123-402-2940',
  docsUrl: 'https://docs.com',
  timeZoneIanaName: 'America/New_York',
  role: 'COUNSELOR' as Role,
  counselorRoomLink: 'https://www.zoomtest.com',
  counselorRoomLink2: 'https://www.zoomtest.com',
};

describe('CreateCounselorForm', () => {
  it('Should submit default counselor if nothing has changed', () => {
    const submitCallback = jest.fn();
    render(
      <CreateCounselorForm
        defaultCounselor={testCounselor}
        onSubmit={submitCallback}
        onCancel={jest.fn()}
      />
    );

    // click submit button
    const button = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(button);

    expect(submitCallback).toHaveBeenCalledWith(testCounselor);
  });
  test('Cancel button calls onCancel callback', () => {
    const cancelCallback = jest.fn();
    render(
      <CreateCounselorForm onSubmit={jest.fn()} onCancel={cancelCallback} />
    );

    const button = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(button);

    expect(cancelCallback).toHaveBeenCalled();
  });
  test('a new counselor should have a positive ID', () => {
    const submitCallback = jest.fn();
    render(
      <CreateCounselorForm onSubmit={submitCallback} onCancel={jest.fn()} />
    );
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
    userEvent.type(inputPhone, '123-402-2940');

    const inputDocsUrl = screen.getByRole('textbox', {
      name: 'Docs URL:',
    }) as HTMLInputElement;
    userEvent.type(inputDocsUrl, 'https://docs.com');

    const inputRoomLink = screen.getByRole('textbox', {
      name: 'Room Link:',
    }) as HTMLInputElement;
    userEvent.type(inputRoomLink, 'https://www.zoomtest.com');

    const inputRoomLink2 = screen.getByRole('textbox', {
      name: 'Room Link 2:',
    }) as HTMLInputElement;
    userEvent.type(inputRoomLink2, 'https://www.zoomtest.com');

    //click submit button
    const button = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(button);

    //check that the ID is -1
    expect(submitCallback.mock.calls[0][0].id).toBe('-1');
  });
});
