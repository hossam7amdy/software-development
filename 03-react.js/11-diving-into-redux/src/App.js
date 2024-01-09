import { Fragment } from "react";
import { useSelector } from "react-redux";
import Counter from "./components/Counter";
import Auth from "./components/Auth";
import Headers from "./components/Header";
import UserProfile from "./components/UserProfile";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Fragment>
      <Headers />
      {!isAuth && <Auth />}
      {isAuth && <UserProfile />}
      <Counter />;
    </Fragment>
  );
}

export default App;
