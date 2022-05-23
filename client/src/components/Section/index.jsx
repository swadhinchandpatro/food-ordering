import React, { useEffect, useRef } from 'react';
import Card, { CardSkeleton } from '../Card'
import { v4 } from "uuid";
import PropTypes from 'prop-types';

import './styles.scss';

const Section = (props) => {
  const { category, restaurantList = [] } = props.data || {};

  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef?.current;

    if(section) {
      props.observer.observe(section)
    }
    // clean up the observer
    return (() => {
      props.observer.unobserve(section)
    })
  }, [sectionRef, props.observer])

  return (
    <div className="section">
      { !props.isShuffled && <h1 className="section__heading" ref={sectionRef} id={props.id} >{category}</h1> }
      <div className="section__layout grid">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  )
}

export const SectionSkeleton = () => {
  return (
    <div className="section">
      <div className="section__heading shimmer-content shimmerBG"></div>
      <div className="section__layout grid">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  )
}

Section.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  observer: PropTypes.any.isRequired,
  isShuffled: PropTypes.bool
}

export default Section;