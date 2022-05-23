import React, { useEffect, useMemo, useRef, useState } from "react";
import Button from "../Buttons";
import { v4 } from "uuid";
import PropTypes from "prop-types";

import "./styles.scss";

const scrollIntoView = (viewId) => {
  const view = document.getElementById(viewId);
  const pageYOffset = view.offsetTop;
  window.scrollTo({
    top: pageYOffset - document.getElementById(viewId).offsetHeight,
    left: 0,
    behavior: "smooth",
  });
};

const calculateRestaurants = (data = []) => {
  return data.reduce((sum, item) => {
    const categoryCount = item.restaurantList && item.restaurantList.length;
    return sum + categoryCount;
  }, 0);
};

const NavItemBar = (props) => {
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const header = headerRef?.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsSticky(!entry.isIntersecting);
        });
      },
      {
        rootMargin: `${document.querySelector("header").offsetHeight * -1}px`,
        threshold: 0,
      }
    );

    if (header) {
      observer.observe(header);
    }
    // clean up the observer
    return () => {
      observer.unobserve(header);
    };
  }, [headerRef]);

  const getCategoryButton = (category, i) => {
    return (
      <Button
        key={v4()}
        selected={
          (!props.isShuffled && props.category === `section${i}`)
        }
        onClick={(e) => {
          props.omitCategory(false)
          scrollIntoView(`section${i}`)
        }}
      >
        {category}
      </Button>
    );
  };

  const count = useMemo(() => calculateRestaurants(props.data), [props.data]);

  const headerClass = "nav-item-bar content-padding";
  
  const ViewAllButton = (
    <Button
      key={v4()}
      selected={props.isShuffled}
      onClick={() => props.omitCategory(true)}
    >
      View All
    </Button>
  );
  const CategoryButtons =
    (
      props.data &&
      props.data.map((item) => item.category).map(getCategoryButton).concat(ViewAllButton)
    ) || [];

  return (
    <div
      ref={headerRef}
      className={isSticky ? `${headerClass} sticky` : headerClass}
    >
      <div className="nav-item-bar__container">
        <div className="nav-item-bar__count">
          <h1>{count} restaurants</h1>
        </div>
        <div className="nav-item-bar__categories">{CategoryButtons}</div>
      </div>
      <hr></hr>
    </div>
  );
};

NavItemBar.propTypes = {
  category: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  omitCategory: PropTypes.func.isRequired,
  isShuffled: PropTypes.bool.isRequired,
};

export default NavItemBar;
