import React, { useState, Fragment, useRef } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

import styles from "./AddUser.module.css";

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();
  const [error, setError] = useState(null);

  const errorHandler = () => {
    setError(null);
  };

  const addUserHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredAge = ageInputRef.current.value;

    nameInputRef.current.value = ageInputRef.current.value = "";

    if (!isValidInputs(enteredName, +enteredAge)) {
      setError({
        title: "Invalid Input!",
        message: `Please enter a valid ${
          enteredName.trim().length === 0
            ? "name and age (non-empty values)"
            : "age between [15 - 65]"
        }`,
      });
      return;
    }

    props.onAddUser(enteredName, +enteredAge);
  };

  const isValidInputs = (enteredName, enteredAge) => {
    return (
      enteredName.trim().length > 0 && 15 <= enteredAge && enteredAge <= 65
    );
  };

  return (
    <Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <div>
            <label htmlFor="username">UserName</label>
            <input
              required
              id="username"
              type="text"
              ref={nameInputRef}
            ></input>
            <label htmlFor="age">Age (Years)</label>
            <input required id="age" type="number" ref={ageInputRef}></input>
            <Button type="submit">Add User</Button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default AddUser;
