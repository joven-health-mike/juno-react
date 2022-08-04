/**
 * @jest-environment jsdom
 */

import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import XButton from './XButton';

describe('XButton', () => {
  it('should call the onClick function when the button is clicked', async () => {
    const value = 'Hello World';
    const callback = jest.fn();
    const view = render(<XButton value={value} onClick={callback} />);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const button = await view.findByTestId('button-x');
    fireEvent.click(button);
    expect(callback).toHaveBeenCalled();
  });

  it('should set the value to the button', async () => {
    const value = 'Hello World';
    const callback = jest.fn();
    const view = render(<XButton value={value} onClick={callback} />);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const button = (await view.findByTestId('button-x')) as HTMLButtonElement;
    expect(button.value).toEqual(value);
  });
});
