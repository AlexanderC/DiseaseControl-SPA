import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Form, FormGroup, Input, Label, Container, Row, Col, Button, FormFeedback, Alert } from 'reactstrap';
import logo from '../../resources/img/logo.png';
import axios from '../../services/Axios';

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<boolean>(false);
  const [inputError, setInputError] = useState<boolean>(false);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      history.push('/')
    }
  }, [history])

  const validate = useCallback(() => {
    return email.length > 0 && password.length > 0;
  }, [email, password])

  const handleLogin = useCallback(() => {
    setInputError(false);
    setLoginError(false);

    const isValid = validate();

    if (isValid) {
      axios.post('/identity/login', {
        username: email,
        password
      }).then(({ data }) => {
        localStorage.setItem('currentUser', JSON.stringify(data));
        history.push('/');
      }).catch(() => {
        setLoginError(true);
      })
    } else {
      setInputError(true);
    }
  }, [email, password, history, validate])

  return (
    <Container className="my-3">
      <Row className="justify-content-center">
        <Col sm="8" lg="6">
          <div className="text-center m-3">
            <img src={logo} alt="" style={{ width: '35%' }} />
          </div>
          <Form>
            <FormGroup>
              <Label>
                <FormattedMessage id="login.email" />
              </Label>
              <Input
                type="email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
              {inputError && (
                <FormFeedback valid={false} className="d-block">
                  <FormattedMessage id="login.inputError" />
                </FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label>
                <FormattedMessage id="login.password" />
              </Label>
              <Input type="password" value={password} onChange={(e: any) => setPassword(e.target.value)} />
            </FormGroup>
            {loginError && (
              <Alert color="danger">
                <FormattedMessage id="login.error" />
              </Alert>
            )}
            <Button onClick={handleLogin}>
              <FormattedMessage id="login.button" />
            </Button>
          </Form>
        </Col>
      </Row>
    </Container >
  )
};