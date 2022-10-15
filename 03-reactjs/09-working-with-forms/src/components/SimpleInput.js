import useInput from "../hooks/use-input";
import Input from "./Input";

const isValidEmail = (email) => {
  const regex = /^[a-zA-Z]+\w*@[a-zA-Z]+[.][a-zA-Z]{2,}$/g;
  return regex.test(email);
};

const SimpleInput = (props) => {
  const {
    value: enteredName,
    hasError: nameInputHasError,
    isValid: enteredNameIsValid,
    valueInputChangeHandler: nameInputChangeHandler,
    valueInputBlurHandler: nameInputBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    isValid: enteredEmailIsValid,
    valueInputChangeHandler: emailInputChangeHandler,
    valueInputBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput,
  } = useInput(isValidEmail);

  const formIsValid = enteredNameIsValid && enteredEmailIsValid;

  const formSubmitHandler = (event) => {
    event.preventDefault();

    console.log(enteredName);
    console.log(enteredEmail);

    resetNameInput();
    resetEmailInput();
  };

  const inputNameClasses = `form-control ${nameInputHasError ? "invalid" : ""}`;
  const inputEmailClasses = `form-control ${
    emailInputHasError ? "invalid" : ""
  }`;

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={inputNameClasses}>
        <Input
          label="Your Name"
          value={enteredName}
          type="text"
          id="name"
          onBlur={nameInputBlurHandler}
          onChange={nameInputChangeHandler}
        />
        {nameInputHasError && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>

      <div className={inputEmailClasses}>
        <Input
          label="Your Email"
          value={enteredEmail}
          type="text"
          id="email"
          onBlur={emailInputBlurHandler}
          onChange={emailInputChangeHandler}
        />
        {emailInputHasError && <p className="error-text">Invalid Email</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
