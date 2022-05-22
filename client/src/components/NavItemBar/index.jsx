import React from "react";
import Button from '../Buttons';

import './styles.scss';

const scrollIntoView = (e, viewId) => {
  const view = document.getElementById(viewId);
  const pageYOffset = view.offsetTop;
  window.scrollTo(0, pageYOffset);
}

const NavItemBar = () => {
  return (
    <div className="nav-item-bar content-padding">
      <div className="nav-item-bar__container">
        <div className="nav-item-bar__count"><h1><b>515 restaurants</b></h1></div>
        <div className="nav-item-bar__categories">
          <Button selected={true} data-target-id="section1" onClick={(e) => scrollIntoView(e, "section1")}>Relevance</Button>
          <Button data-target-id="section2" onClick={(e) => scrollIntoView(e, "section2")}>Delivery Time</Button>
          <Button data-target-id="section3" onClick={(e) => scrollIntoView(e, "section3")}>Rating</Button>
        </div>
      </div>
      <hr></hr>
    </div>
  )
}

export default NavItemBar;