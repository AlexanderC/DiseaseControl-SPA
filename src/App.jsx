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
import WithRedirect from './hoc/WithRedirect';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/details/:id">
          <WithRedirect>
            <Details />
          </WithRedirect>
        </Route>
        <Route exact path="/">
          <WithRedirect>
            <Dashboard />
          </WithRedirect>
        </Route>
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}

export default App;
