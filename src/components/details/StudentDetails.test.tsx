/**
 * @jest-environment jsdom
 */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';
import { render } from '@testing-library/react';
import StudentDetails from './StudentDetails';

const testStudent = {
  first_name: 'firstName',
  last_name: 'lastName',
  _id: '0',
  schoolId: '0',
  counselorId: '0',
};

const testSchoolName = 'Aardvark Academy';
const testCounselorName = 'Jacek McGuinness';

describe('SchoolDetails', () => {
  it('should display name', async () => {
    const view = render(<StudentDetails student={testStudent} />);
    const nameView = await view.findByTestId('name');
    expect(nameView.innerHTML).toEqual(
      testStudent.first_name + ' ' + testStudent.last_name
    );
  });
  it('should display ID as a string', async () => {
    const view = render(<StudentDetails student={testStudent} />);
    const idView = await view.findByTestId('id');
    expect(idView.innerHTML).toEqual('ID: ' + testStudent._id.toString());
  });
  it('should display the school ID', async () => {
    const view = render(<StudentDetails student={testStudent} />);
    const schoolIdView = await view.findByTestId('schoolId');
    expect(schoolIdView.innerHTML).toEqual('School: ' + testSchoolName);
  });
  it('should display the counselor ID', async () => {
    const view = render(<StudentDetails student={testStudent} />);
    const counselorIdView = await view.findByTestId('counselorId');
    expect(counselorIdView.innerHTML).toEqual(
      'Counselor: ' + testCounselorName
    );
  });
  it('should display ID as <p>', async () => {
    const view = render(<StudentDetails student={testStudent} />);
    const idView = await view.findByTestId('id');
    expect(idView.nodeName.toLowerCase()).toEqual('p');
  });
  it('should display the student name as <h2>', async () => {
    const view = render(<StudentDetails student={testStudent} />);
    const nameView = await view.findByTestId('name');
    expect(nameView.nodeName.toLowerCase()).toEqual('h2');
  });
  it('should display school ID as <p>', async () => {
    const view = render(<StudentDetails student={testStudent} />);
    const schoolIdView = await view.findByTestId('schoolId');
    expect(schoolIdView.nodeName.toLowerCase()).toEqual('p');
  });
  it('should display the counselor ID as <p>', async () => {
    const view = render(<StudentDetails student={testStudent} />);
    const counselorIdView = await view.findByTestId('counselorId');
    expect(counselorIdView.nodeName.toLowerCase()).toEqual('p');
  });
});
