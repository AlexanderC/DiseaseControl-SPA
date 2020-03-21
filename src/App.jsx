import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import styled from 'styled-components';
import { Provider } from 'react-redux';
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/login/Login";
import Details from "./components/details/Details";
import WithRedirect from './hoc/WithRedirect';
import logo from './resources/img/logo.png';
import store from './store';

const Header = styled.div`
  display: flex;
`;

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <div>
              <Header>
                <Link to="/">
                  <img src={logo} alt="logo" width="100px"/>
                </Link>
                {/* <HeaderButtons>
                  <Link to="/" style={{textDecoration: 'none'}}>
                    <HeaderButton>
                      <FormattedMessage id="header.list" />
                    </HeaderButton>
                  </Link>
                </HeaderButtons> */}
              </Header>
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
            </div>
            <Redirect from="*" to="/" />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
