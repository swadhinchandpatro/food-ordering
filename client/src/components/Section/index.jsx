import React from 'react';

import './styles.scss';

const Section = (props) => {
  return (
    <div id={props.id} className="section">
      <h1>{props.id}</h1>
    </div>
  )
}

export default Section;