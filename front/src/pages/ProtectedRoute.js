import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "./../hooks/UserContext";
import Loading from "../components/Loading";
import Sidebar from "../components/Sidebar";
import NotFound from "../pages/NotFound";

export default function PrivateRoute({
  role,
  nav,
  location,
  userRole,
  component: Component,
  ...rest
}) {
  const { user, isLoading } = useContext(UserContext);
  if (isLoading) {
    return <Loading />;
  }

  if (user && role && !role.find((element) => element === user.roles.name)) {
    return (
      <Route {...rest} render={(props) => <NotFound isErrorRole={true} />} />
    );
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <div>
            <Sidebar user={user} nav={nav}>
              <Component {...props} user={user} />
            </Sidebar>
          </div>
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
}
