/**
 * @jest-environment jsdom
 */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';
import { render, screen } from '@testing-library/react';
import AppointmentDetails from './AppointmentDetails';
import { Appointment } from '../../data/appointments';
import { emptySchool } from '../../data/schools';
import { emptyUser } from '../../data/users';

const fakeAppointment: Appointment = {
  id: '0',
  title: 'Hello World',
  start: new Date(),
  end: new Date(new Date().getTime() + 60000 * 30),
  counselor: { ...emptyUser, firstName: 'Jacek', lastName: 'McGuinness' },
  school: emptySchool,
  participants: [],
  type: 'CLINICAL',
  status: 'SCHEDULED',
  location: 'UNKNOWN',
};

const fakeCounselorName = 'Jacek McGuinness';

describe('AppointmentDetails', () => {
  const renderComponent = () =>
    render(<AppointmentDetails appointment={fakeAppointment} />);

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
});
