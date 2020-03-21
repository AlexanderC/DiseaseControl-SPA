import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/login/Login";
import Details from "./components/details/Details";
import WithRedirect from './hoc/WithRedirect';
import logo from './resources/img/logo.png';

const Header = styled.div`
  display: flex;
`;

const HeaderButtons = styled.div`
  margin-left: 100px;
`;

const HeaderButton = styled.div`
  height: 40px;
  margin-top: 25px;
  line-height: 40px;
  background: #5ca1cd;
  color: aliceblue;
  border-radius: 5px;
  padding: 10px 20px;
`;

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <div>
            <Header>
              <Link to="/">
                <img src={logo} alt="logo" width="200px"/>
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
  );
}

export default App;
