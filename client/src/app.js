import ReactDom from 'react-dom';
import React, { useState, useCallback } from 'react';
import Header from './components/Header'
import Footer from './components/Footer'
import Section from './components/Section'
import NavItembar from './components/NavItemBar'
import "./app.scss";

const PageLayout = (props) => {
  return (
    <div className="page-layout content-padding">
      <Section {...props} id="section1" />
      <Section {...props} id="section2" />
      <Section {...props} id="section3" />
    </div>
  )
}

const App = () => {
  const [category, setCategory] = useState("section1");
  const selectCategory = useCallback(() => setCategory(category), [category]);
  let observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        setCategory(category => entry.isIntersecting && entry.target.id !== category ? entry.target.id : category);
      })
    },
    {
      rootMargin: "30px 0px -50% 0px",
      threshold: 1
    }
  );

  return (
    <div className="wrapper">
      <Header />
      <NavItembar category={category} setCategory={setCategory}/>
      <PageLayout observer={observer} setCategory={selectCategory} />
      <Footer />
    </div>
  )
}

const rootNode = document.getElementById('root');
ReactDom.render(<App />, rootNode);