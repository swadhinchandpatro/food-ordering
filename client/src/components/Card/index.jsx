import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import "./styles.scss";

const CardWithContent = ({
  image_src,
  isExlusive,
  name,
  food_types,
  ratings,
  delivery_time,
  price_for_two,
}) => {
  return (
    <div className={ isExlusive ? "badge" : "" }>
      <div className="card-layout">
        <div className="card-layout__img">
          <img src={image_src || "#"} />
        </div>
        <div className="card-layout__restaurant">
          <h4>{name}</h4>
          <p className="text-info">
            {(food_types && food_types.join(", ")) || ""}
          </p>
        </div>
        <div className="card-layout__info">
          <div>
            {ratings ? (
              <div className="rating">
                <FontAwesomeIcon icon={faStar} size="xs" />
                <pre> {ratings}</pre>
              </div>
            ) : (
              <div className="no-rating">
                <FontAwesomeIcon icon={faStar} size="xs" color="black" />
                <pre> --</pre>
              </div>
            )}
          </div>
          <p className="text-info">{delivery_time}</p>
          <div className="text-info">₹{price_for_two} FOR TWO</div>
        </div>
        <div className="card-layout__menu">
          <a href="#" className="menu">
            Quick View
          </a>
        </div>
      </div>
    </div>
  );
};

CardWithContent.propTypes = {
  image_src: PropTypes.string.isRequired,
  isExlusive: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  food_types: PropTypes.array.isRequired,
  ratings: PropTypes.string.isRequired,
  delivery_time: PropTypes.string.isRequired,
  price_for_two: PropTypes.number.isRequired,
};

const CountCard = ({ itemToLoad, onClick }) => {
  return (
    <div className="count-card" onClick={onClick}>
      <div className="text-info">+{itemToLoad}</div>
    </div>
  );
};

CountCard.propTypes = {
  itemToLoad: PropTypes.number.isRequired,
};

const Card = (props) => {
  return props.withContent ? (
    <CardWithContent {...props} />
  ) : (
    <CountCard {...props} />
  );
};

Card.propTypes = {
  withContent: PropTypes.bool,
  ...CardWithContent.propTypes,
};

export const CardSkeleton = () => {
  return (
    <div className="card-layout">
      <div className="img-layout shimmerBG"></div>
      <div className="shimmer-content shimmerBG"></div>
      <div className="shimmer-content shimmerBG"></div>
      <div className="shimmer-content shimmerBG"></div>
    </div>
  );
};

export default Card;
