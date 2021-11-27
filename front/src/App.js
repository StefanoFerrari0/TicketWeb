import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import QrReader from "./pages/QrReader";
import EventDashboard from "./pages/EventDashboard";
import BatchesDashboard from "./pages/Home";
import UserDashboard from "./pages/UserDashboard";
import PrivateRoute from "./pages/ProtectedRoute";
import NotFound from "./pages/NotFound";
//Hooks
import { UserContext } from "./hooks/UserContext";
import useFindUser from "./hooks/useFindUser";

function App() {
  const { user, setUser, isLoading } = useFindUser();
  return (

    <div className="app h-screen">
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser, isLoading }}>
          <Switch>
            <PrivateRoute path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <PrivateRoute path="/dashboard" exact component={Home} />
            <PrivateRoute path="/dashboard/lectorqr" role="qr" exact component={QrReader} />
            <PrivateRoute path="/dashboard/eventos" exact role="admin" component={EventDashboard} />
            <PrivateRoute path="/dashboard/tandas" exact role="admin" component={BatchesDashboard} />
            <PrivateRoute path="/dashboard/usuarios" exact role="admin"component={UserDashboard} />
            <Route component={NotFound} />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </div>

  );
}

export default App;
