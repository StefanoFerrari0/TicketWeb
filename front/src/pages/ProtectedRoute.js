import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "./../hooks/UserContext";
import Loading from "../components/Loading";
import Sidebar from "../components/Sidebar";
export default function PrivateRoute(props) {

  const { user, isLoading } = useContext(UserContext);
  const { component: Component, ...rest } = props;
  var navigation = props.nav; 

  if(isLoading){
    return <Loading/>
  }

  return (
  <Route {...rest} render={(props) => (
    user ? (
      <div>
        <Sidebar user={user} nav={navigation}>
          <Component {...props}/>
        </Sidebar>
      </div>
    ) : (
      <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )    
    )
  }
  />
  )
}
