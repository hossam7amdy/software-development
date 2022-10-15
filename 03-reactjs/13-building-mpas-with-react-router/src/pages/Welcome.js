import { Link, Outlet } from "react-router-dom";

const Welcome = () => {
  return (
    <section>
      <h1>The Welcome page</h1>
      <Link to={"new-user"}>New User</Link>
      <Outlet />
    </section>
  );
};

export default Welcome;
