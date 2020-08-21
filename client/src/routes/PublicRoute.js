import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuth } from "../utils/helper";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth() && restricted ? (
          <Redirect to="/user/dashboard" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
