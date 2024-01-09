import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  console.log("Button Evaluating");
  return (
    <button
      type={props.type || "button"}
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

// React.memo(): causes component to Re-evaluate only when it sees any changes = internal comparison before excution
export default React.memo(Button);
