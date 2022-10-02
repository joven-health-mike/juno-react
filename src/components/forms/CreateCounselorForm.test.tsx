/**
 * @jest-environment jsdom
 */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import CreateCounselorForm from './CreateCounselorForm';
import { emptyUser } from '../../data/users';
import { Role } from '../../services/user.service';
import { Counselor } from '../../data/counselors';

const testCounselor: Counselor = {
  id: '-1',
  firstName: 'firstName',
  lastName: 'lastName',
  email: '',
  username: '',
  phone: '',
  docsUrl: '',
  timeZoneOffset: 0,
  role: 'JOVEN_STAFF' as Role,
  counselorRef: {
    id: '0',
    userId: '-1',
    roomLink: 'https://www.zoomtest.com',
  },
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
    const inputName = (await view.findByTestId(
      'input-name'
    )) as HTMLInputElement;
    inputName.value = 'name';

    const inputEmail = (await view.findByTestId(
      'input-email'
    )) as HTMLInputElement;
    inputEmail.value = 'email@test.com';

    const inputRoomLink = (await view.findByTestId(
      'input-roomLink'
    )) as HTMLInputElement;
    inputRoomLink.value = 'roomLink';

    //click submit button
    const button = await view.findByTestId('button-submit');
    fireEvent.click(button);

    //check that the ID is positive
    expect(submitCallback.mock.calls[0][0]._id).toBeGreaterThanOrEqual(0);
  });

  test('Check if names match', () => {
    expect(testCounselor.firstName).toBe('firstName');
    expect(testCounselor.lastName).toBe('lastName');
  });

  test('Check if emails match', () => {
    expect(testCounselor.email).toBe('email@test.com');
  });

  test('Check if room links match', () => {
    expect(testCounselor.counselorRef.roomLink).toBe(
      'https://www.zoomtest.com'
    );
  });
});
