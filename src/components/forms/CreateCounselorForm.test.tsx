/**
 * @jest-environment jsdom
 */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import CreateCounselorForm from './CreateCounselorForm';
import { emptyUser } from '../../data/users';

const testCounselor = {
  name: 'name',
  _id: 0,
  email: 'email@test.com',
  roomLink: 'https://www.zoomtest.com',
  user: emptyUser,
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
    expect(testCounselor.name).toBe('name');
  });

  test('Check if emails match', () => {
    expect(testCounselor.email).toBe('email@test.com');
  });

  test('Check if room links match', () => {
    expect(testCounselor.roomLink).toBe('https://www.zoomtest.com');
  });
});
