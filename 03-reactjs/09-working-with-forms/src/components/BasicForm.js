import useInput from "../hooks/use-input";
import Input from "./Input";

const isNotEmpty = (value) => {
  return value.trim() !== "";
};

const isValidEmail = (email) => {
  const regex = /^[a-zA-Z]+\w*@[a-zA-Z]+[.][a-zA-Z]{2,}$/g;
  return regex.test(email);
};

const BasicForm = (props) => {
  const {
    value: firstName,
    hasError: firstNameInputHasError,
    isValid: firstNameIsValid,
    valueInputBlurHandler: firstNameInputHandler,
    valueInputChangeHandler: firstNameInputChangeHandler,
    reset: resetFirstNameInput,
  } = useInput(isNotEmpty);

  const {
    value: lastName,
    hasError: lastNameInputHasError,
    isValid: lastNameIsValid,
    valueInputBlurHandler: lastNameInputHandler,
    valueInputChangeHandler: lastNameInputChangeHandler,
    reset: resetlastNameInput,
  } = useInput(isNotEmpty);

  const {
    value: email,
    hasError: emailInputHasError,
    isValid: emailIsValid,
    valueInputBlurHandler: emailInputHandler,
    valueInputChangeHandler: emailInputChangeHandler,
    reset: resetEmailInput,
  } = useInput(isValidEmail);

  const formIsValid = firstNameIsValid && lastNameIsValid && emailIsValid;

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log("Submitted!");
    console.log(firstName, lastName, email);

    resetFirstNameInput();
    resetlastNameInput();
    resetEmailInput();
  };

  const inputFirstNameClasses = `form-control ${
    firstNameInputHasError ? "invalid" : ""
  }`;
  const inputLastNameClasses = `form-control ${
    lastNameInputHasError ? "invalid" : ""
  }`;
  const inputEmailClasses = `form-control ${
    emailInputHasError ? "invalid" : ""
  }`;

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div className={inputFirstNameClasses}>
          <Input
            label="First Name"
            id="name"
            type="text"
            value={firstName}
            onChange={firstNameInputChangeHandler}
            onBlur={firstNameInputHandler}
          />
          {firstNameInputHasError && (
            <p className="error-text">First Name must be not empty</p>
          )}
        </div>
        <div className={inputLastNameClasses}>
          <Input
            label="Last Name"
            id="name"
            type="text"
            value={lastName}
            onChange={lastNameInputChangeHandler}
            onBlur={lastNameInputHandler}
          />
          {lastNameInputHasError && (
            <p className="error-text">Last Name must be not empty</p>
          )}
        </div>
      </div>
      <div className={inputEmailClasses}>
        <Input
          label="E-mail Address"
          id="email"
          type="email"
          value={email}
          onChange={emailInputChangeHandler}
          onBlur={emailInputHandler}
        />
        {emailInputHasError && (
          <p className="error-text">Invalid Email Address</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
