import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <div>
      <button
        className={styles.button}
        type={props.type || "submit"}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </div>
  );
};

export default Button;
