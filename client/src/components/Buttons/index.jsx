import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";

const Button = (props) => {
  return (
    <div data-testid="category-button" onClick={props.onClick} className={ props.selected ? 'category selected' : 'category'}>
      {props.children}
    </div>
  )
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool
}

export default Button;