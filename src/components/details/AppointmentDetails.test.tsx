/**
 * @jest-environment jsdom
 */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';
import { render } from '@testing-library/react';
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
  it('should display title', async () => {
    const view = render(<AppointmentDetails appointment={fakeAppointment} />);
    const titleView = await view.findByTestId('title');
    expect(titleView.innerHTML).toEqual(fakeAppointment.title);
  });
  it('should display counselor ID', async () => {
    const view = render(<AppointmentDetails appointment={fakeAppointment} />);
    const counselorIdView = await view.findByTestId('counselorId');
    expect(counselorIdView.innerHTML).toEqual(
      'Counselor: ' + fakeCounselorName
    );
  });
  it('should display title as <h2>', async () => {
    const view = render(<AppointmentDetails appointment={fakeAppointment} />);
    const titleView = await view.findByTestId('title');
    expect(titleView.nodeName.toLowerCase()).toEqual('h2');
  });
  it('should display counselor ID as <p>', async () => {
    const view = render(<AppointmentDetails appointment={fakeAppointment} />);
    const counselorIdView = await view.findByTestId('counselorId');
    expect(counselorIdView.nodeName.toLowerCase()).toEqual('p');
  });
});
