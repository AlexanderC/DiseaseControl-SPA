import React from "react";
import { useHistory } from "react-router-dom";
import { Switch, Link } from "react-router-dom";
import { Navbar, NavbarBrand, Container, Badge, Button } from "reactstrap";
import { NotificationContainer } from "react-notifications";
import { Dashboard } from "./components/dashboard/Dashboard";
import Login from "./components/login/Login";
import Details from "./components/details/Details";
import logo from "./resources/img/logo.png";
import { ProtectedRoute } from "./shared/ProtectedRoute";
import { PublicRoute } from "./shared/PublicRoute";

const suspenseFallback = (
  <div
    className="d-flex align-items-center justify-content-center"
    style={{ height: "100vh" }}
  >
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

function App() {
  return (
    <React.Suspense fallback={suspenseFallback}>
      <Header />
      <Switch>
        <PublicRoute exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Dashboard} />
        <ProtectedRoute exact path="/details/:id" component={Details} />
      </Switch>
      <Footer />
      <NotificationContainer />
    </React.Suspense>
  );
}

export default App;

function Header() {
  const history = useHistory();
  const isLoggedIn = localStorage.getItem("currentUser") !== "";
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

          {isLoggedIn && (
            <Button
              color="primary"
              className="float-right"
              onClick={() => {
                localStorage.setItem("currentUser", "");
                history.push("/login");
              }}
            >
              Logout
            </Button>
          )}
        </Navbar>
      </Container>
    </section>
  );
}

function Footer() {
  return (
    <section className="mt-auto p-4 text-center bg-light">
      <Badge
        tag="a"
        color="warning"
        href="https://c19.md"
        target="_blank"
        rel="noopener noreferrer"
        className="mr-2"
      >
        c19.md
      </Badge>
      Instrumente open-source în contextul pandemiei Covid-19
    </section>
  );
}
