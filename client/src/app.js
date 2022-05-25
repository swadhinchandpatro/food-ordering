import ReactDom from "react-dom";
import React, { useState, memo, useEffect, useMemo } from "react";
import { v4 } from "uuid";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Section, { SectionSkeleton } from "./components/Section";
import NavItembar from "./components/NavItemBar";
import { fetchServerData } from "../src/controllers/apis";
import PropTypes from 'prop-types';

import "./app.scss";

const PageLayout = (props) => {
  let restaurantData = props.data && [...props.data] || [];
  let restaurantList = [];
  if(props.isExlusive) {
    restaurantList = restaurantData && restaurantData.reduce(( flatten, item) => {
      const filteredRestaurants = item.restaurantList.filter(restaurant => restaurant.isExlusive);
      return flatten.concat(filteredRestaurants);
    }, []) || [];

    restaurantData = [{ category: 'Only On Swiggy', restaurantList}];
  }

  const Sections =
    (restaurantData &&
      restaurantData.map((category, i) => (
        <Section
          {...props}
          key={v4()}
          id={`section${i}`}
          data={category}
        />
      ))) ||
    [];

  return <div className="page-layout content-padding">{Sections}</div>;
};

PageLayout.prototype = {
  data: PropTypes.object.isRequired,
  observer: PropTypes.any.isRequired,
  isShuffled: PropTypes.bool,
  isExlusive: PropTypes.bool,
}

const PageLayoutMemoised = memo(PageLayout);

const Skeleton = () => {
  return (
    <div className="page-layout content-padding">
      <SectionSkeleton />
    </div>
  );
};

const App = () => {
  const [category, setCategory] = useState("section0");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isShuffled, setShuffled] = useState(false);
  const [isExlusive, setExlusive] = useState(false);

  let observer = useMemo(() => new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        setCategory((category) =>
          entry.isIntersecting && entry.target.id !== category
            ? entry.target.id
            : category
        );
      });
    },
    {
      rootMargin: "40% 0px -50% 0px",
      threshold: 0,
    }
  ), []);

  useEffect(() => {
    async function fetchRestaurants() {
      const data = await fetchServerData();
      setData(data);
      setLoading(false);
    }

    fetchRestaurants();
  }, []);

  return (
    <div className="wrapper">
      <Header />
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <NavItembar
            data={data}
            category={category}
            omitCategory={setShuffled}
            isShuffled={isShuffled}
            filterExclusive={setExlusive}
            isExlusive={isExlusive}
          />
          <PageLayoutMemoised
            data={data}
            observer={observer}
            isShuffled={isShuffled}
            isExlusive={isExlusive}
          />
        </>
      )}
      <Footer />
    </div>
  );
};

const rootNode = document.getElementById("root");
ReactDom.render(<App />, rootNode);
