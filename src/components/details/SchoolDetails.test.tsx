/**
 * @jest-environment jsdom
 */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';
import { render, screen } from '@testing-library/react';
import SchoolDetails from './SchoolDetails';

const testSchool = {
  name: 'name',
  id: '0',
  primaryEmail: 'email@test.com',
  docsUrl: 'https://test.com',
};

describe('SchoolDetails', () => {
  const renderComponent = () => render(<SchoolDetails school={testSchool} />);

  it('should display name', () => {
    renderComponent();
    const nameView = screen.getByText(testSchool.name);
    expect(nameView).not.toBeNull();
  });
  it('should display email as a string', () => {
    renderComponent();
    const emailView = screen.getByText(
      'Email: ' + testSchool.primaryEmail.toString()
    );
    expect(emailView).not.toBeNull();
  });
  it('should display docs url as a string', () => {
    renderComponent();
    const docsLink = screen.getByRole('link', { name: testSchool.docsUrl });
    expect(docsLink).not.toBeNull();
  });
});
