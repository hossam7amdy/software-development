import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const newPasswordRef = useRef();
  const [isLoading, setIsLoading] = useState(null);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const newPasswordHandler = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    const enteredPassword = newPasswordRef.current.value;

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCo1gm-vuE-KFAM2CUgoL1UW5VDEZpW8LY",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: authCtx.token,
            password: enteredPassword,
            returnSecureToken: false,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error?.message || "something went wrong!");
      }

      authCtx.login(data.idToken);
      authCtx.logout();
      navigate("/auth", { replace: true });
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={classes.form} onSubmit={newPasswordHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          required
          ref={newPasswordRef}
        />
      </div>
      <div className={classes.action}>
        {isLoading && <p>sending data...</p>}
        {!isLoading && <button>Change Password</button>}
      </div>
    </form>
  );
};

export default ProfileForm;
