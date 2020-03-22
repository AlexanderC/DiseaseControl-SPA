import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Navbar, NavbarBrand, Container } from "reactstrap";
import { Provider } from "react-redux";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/login/Login";
import Details from "./components/details/Details";
import logo from "./resources/img/logo.png";
import store from "./store";
import { ProtectedRoute } from "./shared/ProtectedRoute";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/details/:id" component={Details} />
          <ProtectedRoute component={Dashboard} />
        </Switch>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;

function Header() {
  return (
    <section className="bg-light">
      <Container>
        <Navbar color="light" light>
          <NavbarBrand tag={Link} to="/" className="mr-auto">
            <img
              src={logo}
              height="30"
              className="d-inline-block align-top mr-2"
              alt="Logo"
            />
            Disease Control
          </NavbarBrand>
        </Navbar>
      </Container>
    </section>
  );
}

function Footer() {
  return (
    <section className="mt-auto p-4 text-center bg-light">https://c19md.xyz/</section>
  );
}
