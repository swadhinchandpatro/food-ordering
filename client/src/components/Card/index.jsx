import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';

import "./styles.scss";

const CardWithContent = () => {
  return (
    <div className="card-layout">
      <div className="card-layout__img-layout">
        <img src="https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=400&q=60"/>
      </div>
      <div class="card-layout__badge"><div class="card-layout__badge__text">Exclusive</div></div>
      <div className="card-layout__restaurant">
        <h4>Ivaan Hot paratha</h4>
        <p className="text-info">Snacks, North Indian</p>
      </div>
      <div className="card-layout__info">
        <div className="rating">
          <FontAwesomeIcon icon={faStar} size="xs"/>
          <pre> 4.5</pre>
        </div>
        <p className="text-info">30 min</p>
        <div className="text-info"> 200 for two</div>
      </div>
      <div className="card-layout__menu">
        <a href="#" className="menu">Quick View</a>
      </div>
    </div>
  )
}

const CountCard = () => {
  return (
    <div className="count-card">
      <div className="text-info">+9</div>
    </div>
  )
}

const Card = (props) => {
  return !props.withContent ? <CardWithContent /> : <CountCard />;
}

export const CardSkeleton = () => {
  return (
    <div className="card-layout">
      <div className="img-layout shimmerBG">
      </div>
      <div className="shimmer-content shimmerBG">
      </div>
      <div className="shimmer-content shimmerBG">
      </div>
      <div className="shimmer-content shimmerBG">
      </div>
    </div>
  )
}

export default Card;