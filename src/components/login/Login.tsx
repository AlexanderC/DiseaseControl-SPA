import React, { useCallback } from "react";
import { useHistory } from "react-router";
import { Form as FinalForm, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { Form, Container, Row, Col, Button, Alert } from "reactstrap";
import logo from "../../resources/img/logo.png";
import axios from "../../services/Axios";
import { TextField, required, useFormatMessage } from "../../shared";

export default function Login() {
  const l10n = useFormatMessage();
  const history = useHistory();

  const onSubmit = useCallback(
    async (values) => {
      try {
        const { data } = await axios.post("/identity/login", values);
        localStorage.setItem("currentUser", JSON.stringify(data));
        history.push("/");
      } catch (e) {
        return { [FORM_ERROR]: "login.error" };
      }
    },
    [history]
  );

  return (
    <Container className="my-3">
      <Row className="justify-content-center">
        <Col sm="8" lg="6">
          <div className="text-center m-3">
            <img src={logo} alt="" style={{ width: "30%" }} />
          </div>
          <FinalForm onSubmit={onSubmit}>
            {(form) => (
              <Form onSubmit={form.handleSubmit}>
                <Field
                  name="username"
                  type="email"
                  label="login.email"
                  autoComplete="email"
                  component={TextField}
                  validate={required}
                />
                <Field
                  name="password"
                  type="password"
                  label="login.password"
                  autoComplete="current-password"
                  component={TextField}
                  validate={required}
                />
                {form.submitError && (
                  <Alert color="danger">{l10n(form.submitError)}</Alert>
                )}
                <Button>{l10n("login.button")}</Button>
              </Form>
            )}
          </FinalForm>
        </Col>
      </Row>
    </Container>
  );
}
