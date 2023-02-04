/**
 * @jest-environment jsdom
 */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';
import { render } from '@testing-library/react';
import SchoolDetails from './SchoolDetails';

const testSchool = {
  name: 'name',
  id: '0',
  primaryEmail: 'email@test.com',
};

describe('SchoolDetails', () => {
  it('should display name', async () => {
    const view = render(<SchoolDetails school={testSchool} />);
    const nameView = await view.findByTestId('name');
    expect(nameView.innerHTML).toEqual(testSchool.name);
  });
  it('should display email as a string', async () => {
    const view = render(<SchoolDetails school={testSchool} />);
    const emailView = await view.findByTestId('email');
    expect(emailView.innerHTML).toEqual(
      'Email: ' + testSchool.primaryEmail.toString()
    );
  });
  it('should display name as <h2>', async () => {
    const view = render(<SchoolDetails school={testSchool} />);
    const nameView = await view.findByTestId('name');
    expect(nameView.nodeName.toLowerCase()).toEqual('h2');
  });
  it('should display email as <p>', async () => {
    const view = render(<SchoolDetails school={testSchool} />);
    const emailView = await view.findByTestId('email');
    expect(emailView.nodeName.toLowerCase()).toEqual('p');
  });
});
