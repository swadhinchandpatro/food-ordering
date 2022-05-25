import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card, { CardSkeleton } from "..";
import { clickEvent } from '../../../../test/helpers';

describe('Card Component', () => {
  it('should render CountCard', () => {
    const count = 4;
    render(<Card itemToLoad={count} />);

    expect(screen.findByText(`+${count}`)).toBeTruthy();
  })

  it('should execute click handler for CountCard', async () => {
    const count = 4;
    let clicked = false;
    render(<Card itemToLoad={count} onClick={() => {clicked = true}} />);
    // fireEvent(, clickEvent);
    fireEvent(await screen.findByText(`+${count}`), clickEvent);
    expect(screen.findByText(`+${count}`)).toBeTruthy();
    expect(clicked).toBeTruthy();
  })

  it('should render CardWithContent', () => {
    const cardProps = {
      image_src: 'image_src',
      isExlusive: true,
      name: 'My Name',
      food_types: ['North Indian', 'South'],
      ratings: '4',
      delivery_time: '20min',
      price_for_two: 200,
    };
    render(<Card withContent={true} {...cardProps} />);

    expect(screen.findByText(cardProps.name)).toBeTruthy();
    expect(screen.getByTestId('food-types')).toHaveTextContent('North Indian, South')
  })
})

describe('CardSkeletonCard Component', () => {
  it('should render Skeleton', () => {
    const { container } = render(<CardSkeleton />);

    expect(container.getElementsByClassName('shimmerBG').length).toBe(4);
  })
})