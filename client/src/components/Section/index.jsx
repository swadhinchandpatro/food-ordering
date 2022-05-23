import React, { useEffect, useRef } from 'react';
import Card from '../Card'

import './styles.scss';

const Section = (props) => {
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
      <h1 className="section__heading" ref={sectionRef} id={props.id} >{props.id}</h1>
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

export default Section;