/**
 * @jest-environment jsdom
 */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';
import { render, screen } from '@testing-library/react';
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
  const renderComponents = () =>
    render(<StudentDetails student={testStudent} />);

  it('should display name', () => {
    renderComponents();
    const nameView = screen.getByText(
      `${testStudent.firstName} ${testStudent.lastName}`
    );
    expect(nameView).not.toBeNull();
  });
  it('should display the school ID', () => {
    renderComponents();
    const schoolIdView = screen.getByText(`School: ${testSchoolName}`);
    expect(schoolIdView).not.toBeNull();
  });
  it('should display the counselor ID', () => {
    renderComponents();
    const counselorIdView = screen.getByText(`Counselor: ${testCounselorName}`);
    expect(counselorIdView).not.toBeNull();
  });
});
