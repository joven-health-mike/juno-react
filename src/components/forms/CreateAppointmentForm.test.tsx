/**
 * @jest-environment jsdom
 */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CreateAppointmentForm from './CreateAppointmentForm';
import { emptySchool } from '../../data/schools';

const fakeAppointment = {
  id: '0',
  title: 'CLINICAL',
  start: new Date(),
  end: new Date(new Date().getTime() + 60000 * 30),
  isRecurring: false,
  recurranceInfo: undefined,
  school: emptySchool,
  schoolId: '-1',
  participants: [],
  type: 'CLINICAL',
  status: 'SCHEDULED',
  location: 'UNKNOWN',
};

describe('CreateAppointmentForm', () => {
  it('should submit defaultAppointment if nothing is changed', () => {
    const submitCallback = jest.fn();
    render(
      <CreateAppointmentForm
        defaultAppointment={fakeAppointment}
        onSubmit={submitCallback}
        onCancel={jest.fn()}
      />
    );

    // click submit button
    const button = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(button);

    expect(submitCallback).toHaveBeenCalledWith(fakeAppointment);
  });
  it('cancel button calls onCancel callback', () => {
    const cancelCallback = jest.fn();
    render(
      <CreateAppointmentForm onSubmit={jest.fn()} onCancel={cancelCallback} />
    );

    // click cancel button
    const button = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(button);

    expect(cancelCallback).toHaveBeenCalled();
  });

  // TODO: Test submit with new values
  // TODO: Test submit new recurring appointment
});
