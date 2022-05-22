import ReactDom from 'react-dom';
import React from 'react';
import Header from './components/Header'
import Footer from './components/Footer'
import Section from './components/Section'
import NavItembar from './components/NavItemBar'
import "./app.scss";

const PageLayout = () => {
  return (
    <div className="page-layout content-padding">
      <Section id="section1" />
      <Section id="section2" />
      <Section id="section3" />
    </div>
  )
}

const App = () => {
  return (
    <>
      <Header />
      <NavItembar />
      <PageLayout />
      <Footer />
    </>
  )
}

const rootNode = document.getElementById('root');
ReactDom.render(<App />, rootNode);