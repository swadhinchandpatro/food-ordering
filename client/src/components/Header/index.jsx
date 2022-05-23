import React from "react";

import "./styles.scss";
import swiggyLogo from '../../assets/swiggy.svg';

const Header = () => {
  return (
    <header className="header content-padding">
      <div className="header__container">
        <div className="header__logo">
          <img src={swiggyLogo} alt="swiggy logo" width="40px" height="50px"/>
        </div>
        <div className="header__links-group">
          <a href="#">Search</a>
          <a href="#" className="hide-on-mobile">Offers</a>
          <a href="#" className="hide-on-mobile">Help</a>
          <a href="#" className="hide-on-mobile">Swadhin</a>
          <a href="#">Cart</a>
        </div>
      </div>
    </header>
  )
}

export default Header;