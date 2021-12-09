import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./pages/ProtectedRoute";

//Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import TicketHome from "./pages/Ticket/TicketHome";
import QrHome from "./pages/Qr/QrHome";
import EventHome from "./pages/Event/EventHome";
import BatchesHome from "./pages/Batches/BatchesHome";
import UserHome from "./pages/User/UserHome";
import { UserAddEdit } from "./pages/User/UserAddEdit";
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
            <Route path="/login" exact component={Login} />
            <PrivateRoute path="/" exact nav="Dashboard" component={Home} />
            <PrivateRoute path="/entradas" nav="Entradas" role='["RRPP", "admin"]' exact component={TicketHome} />
            <PrivateRoute path="/codigo-qr" nav="Código QR" role='["QR"]' exact component={QrHome} />
            <PrivateRoute path="/eventos" exact nav="Eventos" role='["admin"]' component={EventHome} />
            <PrivateRoute path="/tandas" exact nav="Tandas" role='["admin"]' component={BatchesHome} />
            <PrivateRoute path="/usuarios" exact nav="Usuarios" role='["admin"]' component={UserHome} />
            <PrivateRoute path="/usuarios/editar/:id" exact nav="Usuarios" role='["admin"]' component={UserAddEdit} />
            <PrivateRoute path="/usuarios/crear" exact nav="Usuarios" role='["admin"]' component={UserAddEdit} />

            <Route component={NotFound} />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
