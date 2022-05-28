/* Libraries Imported */
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  /* Set variables*/
  const {currentUser} = useContext(AuthContext);
  return (
    {/* checking if user already log in */},
    <Route
      {...rest}
      render={
        routeProps =>!!currentUser ? (<RouteComponent {...routeProps} />) : (<Redirect to={"/login"} />)
      }
    />
  );
};


export default PrivateRoute