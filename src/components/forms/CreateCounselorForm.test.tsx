/**
 * @jest-environment jsdom
 */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';
import { fireEvent, render } from '@testing-library/react';
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
};

describe('CreateCounselorForm', () => {
  it('Should submit default counselor if nothing has changed', async () => {
    const submitCallback = jest.fn();
    const view = render(
      <CreateCounselorForm
        defaultCounselor={testCounselor}
        onSubmit={submitCallback}
        onCancel={jest.fn()}
      />
    );

    // click submit button
    const button = await view.findByTestId('button-submit');
    fireEvent.click(button);

    expect(submitCallback).toHaveBeenCalledWith(testCounselor);
  });
  test('Cancel button calls onCancel callback', async () => {
    const cancelCallback = jest.fn();
    const view = render(
      <CreateCounselorForm onSubmit={jest.fn()} onCancel={cancelCallback} />
    );

    const button = await view.findByTestId('button-cancel');
    fireEvent.click(button);

    expect(cancelCallback).toHaveBeenCalled();
  });
  test('a new counselor should have a positive ID', async () => {
    const submitCallback = jest.fn();
    const view = render(
      <CreateCounselorForm onSubmit={submitCallback} onCancel={jest.fn()} />
    );
    //add name
    const inputFirstName = (await view.findByTestId(
      'input-first-name'
    )) as HTMLInputElement;
    inputFirstName.value = 'firstName';

    const inputLastName = (await view.findByTestId(
      'input-last-name'
    )) as HTMLInputElement;
    inputLastName.value = 'lastName';

    const inputEmail = (await view.findByTestId(
      'input-email'
    )) as HTMLInputElement;
    inputEmail.value = 'email@test.com';

    const inputUsername = (await view.findByTestId(
      'input-username'
    )) as HTMLInputElement;
    inputUsername.value = 'username';

    const inputPhone = (await view.findByTestId(
      'input-phone'
    )) as HTMLInputElement;
    inputPhone.value = '123-402-2940';

    const inputDocsUrl = (await view.findByTestId(
      'input-docsUrl'
    )) as HTMLInputElement;
    inputDocsUrl.value = 'https://docs.com';

    const inputRoomLink = (await view.findByTestId(
      'input-roomLink'
    )) as HTMLInputElement;
    inputRoomLink.value = 'https://www.zoomtest.com';

    //click submit button
    const button = await view.findByTestId('button-submit');
    fireEvent.click(button);

    //check that the ID is -1
    expect(submitCallback.mock.calls[0][0].id).toBe('-1');
  });

  test('Check if names match', () => {
    expect(testCounselor.firstName).toBe('firstName');
    expect(testCounselor.lastName).toBe('lastName');
  });

  test('Check if emails match', () => {
    expect(testCounselor.email).toBe('email@test.com');
  });

  test('Check if room links match', () => {
    expect(testCounselor.counselorRoomLink).toBe('https://www.zoomtest.com');
  });
});
