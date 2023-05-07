import React from "react";
import { Redirect, Route } from "react-router-dom";

function PrivateRouter({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      component={(props) => {
        const token = window.localStorage.getItem("userInfo");
          return <Component {...props} />;
     
      }}
    />
  );
}

export default PrivateRouter;
