/**
 * @jest-environment jsdom
 */

import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import XButton from './XButton';

describe('XButton', () => {
  it('should call the onClick function when the button is clicked', () => {
    const value = 'Hello World';
    const callback = jest.fn();
    render(<XButton value={value} onClick={callback} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(callback).toHaveBeenCalled();
  });

  it('should set the value to the button', () => {
    const value = 'Hello World';
    const callback = jest.fn();
    render(<XButton value={value} onClick={callback} />);
    const button = screen.getByRole('button') as HTMLButtonElement;
    expect(button.value).toEqual(value);
  });
});
