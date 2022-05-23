import React, { useEffect, useRef, useState } from "react";
import Button from '../Buttons';

import './styles.scss';

const scrollIntoView = (e, viewId) => {
  const view = document.getElementById(viewId);
  const pageYOffset = view.offsetTop;
  window.scrollTo({
    top: pageYOffset,
    left: 0,
    behavior: 'smooth'
  });
}

const NavItemBar = (props) => {
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const header = headerRef?.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setIsSticky(!entry.isIntersecting);
        })
      },
      {
        rootMargin: `${document.querySelector('header').offsetHeight * -1}px`,
        threshold: 0
      }
    );

    if(header) {
      observer.observe(header)
    }
    // clean up the observer
    return (() => {
      observer.unobserve(header)
    })
  }, [headerRef])

  const headerClass = "nav-item-bar content-padding";
  
  return (
    <div ref={headerRef} className={isSticky ? `${headerClass} sticky` : headerClass}>
      <div className="nav-item-bar__container">
        <div className="nav-item-bar__count"><h1>515 restaurants</h1></div>
        <div className="nav-item-bar__categories">
          <Button selected={props.category === "section1"} data-target-id="section1" onClick={(e) => scrollIntoView(e, "section1")}>Relevance</Button>
          <Button selected={props.category === "section2"} data-target-id="section2" onClick={(e) => scrollIntoView(e, "section2")}>Delivery Time</Button>
          <Button selected={props.category === "section3"} data-target-id="section3" onClick={(e) => scrollIntoView(e, "section3")}>Rating</Button>
        </div>
      </div>
      <hr></hr>
    </div>
  )
}

export default NavItemBar;