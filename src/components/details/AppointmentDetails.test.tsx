/**
 * @jest-environment jsdom
 */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';
import { render } from '@testing-library/react';
import AppointmentDetails from './AppointmentDetails';
import { formatDateTime } from '../../utils/DateUtils';
import { Appointment } from '../../data/appointments';
import { emptyCounselorRef } from '../../data/counselors';
import { emptySchool } from '../../data/schools';

const fakeAppointment: Appointment = {
  id: '0',
  title: 'Hello World',
  start: new Date(),
  end: new Date(),
  isRecurring: false,
  counselor: emptyCounselorRef,
  school: emptySchool,
  participants: [],
  type: 'CLINICAL',
  status: 'SCHEDULED',
  location: 'UNKNOWN',
};

const fakeCounselorName = 'Jacek McGuinness';
const fakeStudentName = 'Chris Moon';

describe('AppointmentDetails', () => {
  it('should display ID', async () => {
    const view = render(<AppointmentDetails appointment={fakeAppointment} />);
    const idView = await view.findByTestId('id');
    expect(idView.innerHTML).toEqual('ID: ' + fakeAppointment.id.toString());
  });
  it('should display title', async () => {
    const view = render(<AppointmentDetails appointment={fakeAppointment} />);
    const titleView = await view.findByTestId('title');
    expect(titleView.innerHTML).toEqual(fakeAppointment.title);
  });
  it('should display start date as ISO string', async () => {
    const view = render(<AppointmentDetails appointment={fakeAppointment} />);
    const startView = await view.findByTestId('start');
    expect(startView.innerHTML).toEqual(
      'Start Time: ' + formatDateTime(fakeAppointment.start)
    );
  });
  it('should display end date as ISO string', async () => {
    const view = render(<AppointmentDetails appointment={fakeAppointment} />);
    const endView = await view.findByTestId('end');
    expect(endView.innerHTML).toEqual(
      'End Time: ' + formatDateTime(fakeAppointment.end)
    );
  });
  it('should display counselor ID', async () => {
    const view = render(<AppointmentDetails appointment={fakeAppointment} />);
    const counselorIdView = await view.findByTestId('counselorId');
    expect(counselorIdView.innerHTML).toEqual(
      'Counselor: ' + fakeCounselorName
    );
  });
  it('should display student ID', async () => {
    const view = render(<AppointmentDetails appointment={fakeAppointment} />);
    const studentIdView = await view.findByTestId('studentId');
    expect(studentIdView.innerHTML).toEqual('Student: ' + fakeStudentName);
  });
  it('should display ID as <p>', async () => {
    const view = render(<AppointmentDetails appointment={fakeAppointment} />);
    const idView = await view.findByTestId('id');
    expect(idView.nodeName.toLowerCase()).toEqual('p');
  });
  it('should display title as <h2>', async () => {
    const view = render(<AppointmentDetails appointment={fakeAppointment} />);
    const titleView = await view.findByTestId('title');
    expect(titleView.nodeName.toLowerCase()).toEqual('h2');
  });
  it('should display start date as ISO string as <p>', async () => {
    const view = render(<AppointmentDetails appointment={fakeAppointment} />);
    const startView = await view.findByTestId('start');
    expect(startView.nodeName.toLowerCase()).toEqual('p');
  });
  it('should display end date as ISO string as <p>', async () => {
    const view = render(<AppointmentDetails appointment={fakeAppointment} />);
    const endView = await view.findByTestId('end');
    expect(endView.nodeName.toLowerCase()).toEqual('p');
  });
  it('should display counselor ID as <p>', async () => {
    const view = render(<AppointmentDetails appointment={fakeAppointment} />);
    const counselorIdView = await view.findByTestId('counselorId');
    expect(counselorIdView.nodeName.toLowerCase()).toEqual('p');
  });
  it('should display student ID as <p>', async () => {
    const view = render(<AppointmentDetails appointment={fakeAppointment} />);
    const studentIdView = await view.findByTestId('studentId');
    expect(studentIdView.nodeName.toLowerCase()).toEqual('p');
  });
});
