import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'
import { clickEvent } from '../../../../test/helpers';
import Button from '../index'

describe('Button Component', () => {
  it('render button without selection', () => {
    const { container } = render(<Button onClick={() => {}}/>)
    console.log(container)
    expect(container.getElementsByClassName('selected').length).toBe(0)
  })

  it('render button with selection', () => {
    const { container } = render(<Button selected={true} onClick={() => {}}/>)
    expect(container.getElementsByClassName('selected').length).toBe(1)
  })

  it('render button with selection', () => {
    let clicked = false;
    const { container } = render(<Button selected={true} onClick={() => { clicked = true} }/>)

    fireEvent(screen.getByTestId('category-button'), clickEvent)
    expect(container.getElementsByClassName('selected').length).toBe(1)
    expect(clicked).toBeTruthy();
  })
})