/**
 * @jest-environment jsdom
 */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';
import { render } from '@testing-library/react';
import StudentDetails from './StudentDetails';
import { Role } from '../../services/user.service';
import { Student } from '../../data/students';

const testStudent: Student = {
  firstName: 'firstName',
  lastName: 'lastName',
  id: '0',
  email: '',
  username: '',
  phone: '',
  docsUrl: '',
  timeZoneIanaName: '',
  role: 'STUDENT' as Role,
  studentStatus: 'ACTIVE',
  studentAssignedCounselorId: '-1',
  studentAssignedSchoolId: '-1',
};

const testSchoolName = 'NOT FOUND';
const testCounselorName = 'NOT FOUND';

describe('StudentDetails', () => {
  it('should display name', async () => {
    const view = render(<StudentDetails student={testStudent} />);
    const nameView = await view.findByTestId('name');
    expect(nameView.innerHTML).toEqual(
      testStudent.firstName + ' ' + testStudent.lastName
    );
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
