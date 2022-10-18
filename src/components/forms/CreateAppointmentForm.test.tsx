/**
 * @jest-environment jsdom
 */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import CreateAppointmentForm from './CreateAppointmentForm';
import { emptySchool } from '../../data/schools';
import { emptyCounselorRef } from '../../data/counselors';

const fakeAppointment = {
  id: '0',
  title: 'Hello World',
  start: new Date(),
  end: new Date(),
  isRecurring: false,
  recurranceInfo: undefined,
  school: emptySchool,
  counselor: emptyCounselorRef,
  participants: [],
  type: 'CLINICAL',
  status: 'SCHEDULED',
  location: 'UNKNOWN',
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
});
