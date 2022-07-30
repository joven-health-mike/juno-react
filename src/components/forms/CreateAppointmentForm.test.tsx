/**
 * @jest-environment jsdom
 */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import CreateAppointmentForm from './CreateAppointmentForm';

const fakeAppointment = {
  _id: 0,
  title: 'Hello World',
  start: new Date(),
  end: new Date(),
  counselorId: 1,
  studentId: 2,
};

describe('CreateAppointmentForm', () => {
  it('should submit defaultAppointment if nothing is changed', async () => {
    const submitCallback = jest.fn();
    const view = render(
      <CreateAppointmentForm
        defaultAppointment={fakeAppointment}
        onSubmit={submitCallback}
        onCancel={jest.fn()}
      />
    );

    // click submit button
    const button = await view.findByTestId('button-submit');
    fireEvent.click(button);

    expect(submitCallback).toHaveBeenCalledWith(fakeAppointment);
  });
  test('cancel button calls onCancel callback', async () => {
    const cancelCallback = jest.fn();
    const view = render(
      <CreateAppointmentForm onSubmit={jest.fn()} onCancel={cancelCallback} />
    );

    // click submit button
    const button = await view.findByTestId('button-cancel');
    fireEvent.click(button);

    expect(cancelCallback).toHaveBeenCalled();
  });
  test('a new appointment should have a positive ID', async () => {
    const submitCallback = jest.fn();
    const view = render(
      <CreateAppointmentForm onSubmit={submitCallback} onCancel={jest.fn()} />
    );

    // add a title
    const inputTitle = (await view.findByTestId(
      'input-title'
    )) as HTMLInputElement;
    inputTitle.value = 'Hello World';

    // click submit button
    const button = await view.findByTestId('button-submit');
    fireEvent.click(button);

    // check that the ID is positive
    expect(submitCallback.mock.calls[0][0]._id).toBeGreaterThanOrEqual(0);
  });
});
