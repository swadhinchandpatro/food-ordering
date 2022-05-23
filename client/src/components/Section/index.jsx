import React, { useEffect, useRef } from "react";
import Card, { CardSkeleton } from "../Card";
import { v4 } from "uuid";
import PropTypes from "prop-types";

import "./styles.scss";

const MAX_ALLOWED_CARDS = 5;

const Section = (props) => {
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
    .slice(0, MAX_ALLOWED_CARDS)
    .map(restaurant => <Card key={v4()} withContent={true} {...restaurant} />);
  if (count > MAX_ALLOWED_CARDS) {
    const CardNum = <Card key={v4()} itemToLoad={count - MAX_ALLOWED_CARDS} />;
    Cards.concat(CardNum);
  }

  return (
    <div className="section" ref={sectionRef} id={props.id}>
      {!props.isShuffled && (
        <h1 className="section__heading" >
          { category }
        </h1>
      )}
      <div className="section__layout grid">{Cards}</div>
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

export default Section;
