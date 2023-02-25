/**
 * @jest-environment jsdom
 */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import AppointmentDetails from './AppointmentDetails';
import { Appointment } from '../../data/appointments';
import { emptySchool } from '../../data/schools';
import { emptyUser } from '../../data/users';

const fakeAppointment: Appointment = {
  id: '0',
  title: 'Hello World',
  start: new Date(),
  end: new Date(),
  isRecurring: false,
  counselor: { ...emptyUser, firstName: 'Jacek', lastName: 'McGuinness' },
  school: emptySchool,
  participants: [],
  type: 'CLINICAL',
  status: 'SCHEDULED',
  location: 'UNKNOWN',
};

const fakeCounselorName = 'Jacek McGuinness';

describe('AppointmentDetails', () => {
  const joinAppointmentStub = jest.fn();
  const emailParticipantsStub = jest.fn();
  const cancelAppointmentStub = jest.fn();

  const renderComponent = () =>
    render(
      <AppointmentDetails
        appointment={fakeAppointment}
        onJoinAppointmentClicked={joinAppointmentStub}
        onEmailParticipantsClicked={emailParticipantsStub}
        onCancelAppointmentClicked={cancelAppointmentStub}
      />
    );

  it('should display title', () => {
    renderComponent();
    const titleView = screen.getByText(fakeAppointment.title);
    expect(titleView).not.toBeNull();
  });
  it('should display counselor ID', () => {
    renderComponent();
    const counselorIdView = screen.getByText('Counselor: ' + fakeCounselorName);
    expect(counselorIdView).not.toBeNull();
  });
  it('calls joinAppointmentStub when Join Appointment button is clicked', () => {
    renderComponent();
    const joinAppointmentButton = screen.getByRole('button', {
      name: 'Join Appointment',
    });
    userEvent.click(joinAppointmentButton);
    expect(joinAppointmentStub).toHaveBeenCalled();
  });
  it('calls emailParticipantsStub when Email Participants button is clicked', () => {
    renderComponent();
    const emailParticipantsButton = screen.getByRole('button', {
      name: 'Email Participants',
    });
    userEvent.click(emailParticipantsButton);
    expect(emailParticipantsStub).toHaveBeenCalled();
  });
  it('calls cancelAppointmentStub when Email Participants button is clicked', () => {
    renderComponent();
    const cancelAppointmentButton = screen.getByRole('button', {
      name: 'Cancel Appointment',
    });
    userEvent.click(cancelAppointmentButton);
    expect(cancelAppointmentStub).toHaveBeenCalled();
  });
});
