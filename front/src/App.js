import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./pages/ProtectedRoute";

//Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import { TicketAddEdit } from "./pages/Ticket/TicketAddEdit";
import QrHome from "./pages/QR/QrHome";
import EventHome from "./pages/Event/EventHome";
import { EventAddEdit } from "./pages/Event/EventAddEdit";
import BatchesHome from "./pages/Batches/BatchesHome";
import { BatchesAddEdit } from "./pages/Batches/BatchesAddEdit";
import UserHome from "./pages/User/UserHome";
import { UserAddEdit } from "./pages/User/UserAddEdit";
import UserTicket  from "./pages/User/UserTicket";
import NotFound from "./pages/NotFound";


//Hooks
import { UserContext } from "./hooks/UserContext";
import useFindUser from "./hooks/useFindUser";

function App() {
  
  const { user, setUser, isLoading, setLoading } = useFindUser();
  return (

    <div className="app h-screen">
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser, isLoading, setLoading }}>
          <Switch>
            <Route path="/login" exact component={Login} />
            <PrivateRoute path="/" exact nav="Dashboard" role={['RRPP', 'admin', 'QR']} component={Home} />
            <PrivateRoute path="/entradas/crear" nav="Entradas" role={["RRPP", "admin"]} exact component={TicketAddEdit} />
            <PrivateRoute path="/entradas/editar/:id" nav="Entradas" role={["RRPP", "admin"]} exact component={TicketAddEdit} />
            <PrivateRoute path="/codigo-qr" nav="Código QR" role={["QR", "admin"]} exact component={QrHome} />
            <PrivateRoute path="/eventos" exact nav="Eventos" role={["admin"]} component={EventHome} />
            <PrivateRoute path="/eventos/crear" exact nav="Eventos" role={["admin"]} component={EventAddEdit} />
            <PrivateRoute path="/eventos/editar/:id" exact nav="Eventos" role={["admin"]} component={EventAddEdit} />
            <PrivateRoute path="/tandas" exact nav="Tandas" role={["admin"]} component={BatchesHome} />
            <PrivateRoute path="/tandas/crear" exact nav="Tandas" role={["admin"]} component={BatchesAddEdit} />
            <PrivateRoute path="/tandas/editar/:id" exact nav="Tandas" role={["admin"]} component={BatchesAddEdit} />
            <PrivateRoute path="/usuarios" exact nav="Usuarios" role={["admin"]} component={UserHome} />
            <PrivateRoute path="/usuarios/editar/:id" exact nav="Usuarios" role={["admin"]} component={UserAddEdit} />
            <PrivateRoute path="/usuarios/crear" exact nav="Usuarios" role={["admin"]} component={UserAddEdit} />
            <PrivateRoute path="/usuarios/entradas/:id" exact nav="Usuarios" role={["admin"]} component={UserTicket} />

            <Route component={NotFound} />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
