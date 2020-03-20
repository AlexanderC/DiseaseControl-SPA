import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/login/Login";
import Details from "./components/details/Details";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/details/:id">
          <Details />
        </Route>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}

export default App;
