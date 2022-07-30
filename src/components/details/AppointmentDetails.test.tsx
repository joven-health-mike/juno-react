/**
 * @jest-environment jsdom
 */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';
import { render } from '@testing-library/react';
import AppointmentDetails from './AppointmentDetails';

const fakeAppointment = {
  _id: 0,
  title: 'Hello World',
  start: new Date(),
  end: new Date(),
  counselorId: 1,
  studentId: 2,
};

describe('AppointmentDetails', () => {
  it('should display ID', async () => {
    const view = render(<AppointmentDetails appointment={fakeAppointment} />);
    const idView = await view.findByTestId('id');
    expect(idView.innerHTML).toEqual(fakeAppointment._id.toString());
  });
  it('should display title', async () => {
    const view = render(<AppointmentDetails appointment={fakeAppointment} />);
    const titleView = await view.findByTestId('title');
    expect(titleView.innerHTML).toEqual(fakeAppointment.title);
  });
  it('should display start date as ISO string', async () => {
    const view = render(<AppointmentDetails appointment={fakeAppointment} />);
    const startView = await view.findByTestId('start');
    expect(startView.innerHTML).toEqual(fakeAppointment.start.toISOString());
  });
  it('should display end date as ISO string', async () => {
    const view = render(<AppointmentDetails appointment={fakeAppointment} />);
    const endView = await view.findByTestId('end');
    expect(endView.innerHTML).toEqual(fakeAppointment.end.toISOString());
  });
  it('should display counselor ID', async () => {
    const view = render(<AppointmentDetails appointment={fakeAppointment} />);
    const counselorIdView = await view.findByTestId('counselorId');
    expect(counselorIdView.innerHTML).toEqual(
      fakeAppointment.counselorId.toString()
    );
  });
  it('should display student ID', async () => {
    const view = render(<AppointmentDetails appointment={fakeAppointment} />);
    const studentIdView = await view.findByTestId('studentId');
    expect(studentIdView.innerHTML).toEqual(
      fakeAppointment.studentId.toString()
    );
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
