import ReactDom from "react-dom";
import React, { useState, useCallback, useEffect } from "react";
import { v4 } from "uuid";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Section, { SectionSkeleton } from "./components/Section";
import NavItembar from "./components/NavItemBar";
import { fetchServerData } from "../src/controllers/apis";
import PropTypes from 'prop-types';

import "./app.scss";

const PageLayout = (props) => {
  const Sections =
    (props.data &&
      props.data.map((category, i) => (
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
  isShuffled: PropTypes.bool
}

const Skeleton = () => {
  return (
    <div className="page-layout content-padding">
      <SectionSkeleton />
    </div>
  );
};

const App = () => {
  const [category, setCategory] = useState("section1");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isShuffled, setShuffled] = useState(false);

  let observer = new IntersectionObserver(
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
      rootMargin: "30px 0px -50% 0px",
      threshold: 1,
    }
  );

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
          />
          <PageLayout
            data={data}
            observer={observer}
            isShuffled={isShuffled}
          />
        </>
      )}
      <Footer />
    </div>
  );
};

const rootNode = document.getElementById("root");
ReactDom.render(<App />, rootNode);
