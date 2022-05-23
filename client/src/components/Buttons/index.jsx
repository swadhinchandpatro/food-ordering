import React from "react";

import "./styles.scss";

const Button = (props) => {
  return (
    <div onClick={props.onClick} className={ props.selected ? 'category selected' : 'category'}>
      {props.children}
    </div>
  )
}

export default Button;