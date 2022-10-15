import { Fragment } from "react";

const Input = (props) => {
  return (
    <Fragment>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        value={props.value}
        type={props.type}
        id={props.id}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </Fragment>
  );
};

export default Input;
