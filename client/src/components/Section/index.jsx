import React, { useEffect, useRef, useState, memo } from "react";
import Card, { CardSkeleton } from "../Card";
import { v4 } from "uuid";
import PropTypes from "prop-types";

import "./styles.scss";

const DEFAULT_CARD_LIMIT = 5;

const Section = (props) => {
  const [maxAllowedCards, setMaxAllowedCards] = useState(DEFAULT_CARD_LIMIT);
  let { category, restaurantList = [] } = props.data || {};
  const count = restaurantList.length;

  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef?.current;

    if (section) {
      props.observer.observe(section);
    }
    // clean up the observer
    return () => {
      props.observer.unobserve(section);
    };
  }, [sectionRef, props.observer]);

  const Cards = restaurantList
    .slice(0, maxAllowedCards)
    .map(restaurant => <Card key={v4()} withContent={true} {...restaurant} />);

  return (
    <div className="section" ref={sectionRef} id={props.id}>
      {!props.isShuffled && (
        <h1 className="section__heading" >
          { category }
        </h1>
      )}
      <div className="section__layout grid">
        {Cards}
        { count > maxAllowedCards && <Card key={v4()} onClick={() => setMaxAllowedCards(cards => cards + DEFAULT_CARD_LIMIT)} itemToLoad={count - maxAllowedCards} /> }
      </div>
    </div>
  );
};

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
  );
};

Section.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  observer: PropTypes.any.isRequired,
  isShuffled: PropTypes.bool,
};

export default memo(Section);
