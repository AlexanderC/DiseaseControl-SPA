import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import * as S from './Login.style';
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

  return (<S.MainContainer>
    <S.LoginContainer>
      <S.Logo src={logo} />
      <S.InputContainer>
        <S.InputTitle>
          <FormattedMessage id="login.email" />
        </S.InputTitle>
        <S.Input type="email" value={email} onChange={(e:any) => setEmail(e.target.value)}/>
        <S.ErrorMessage>
          {loginError && <FormattedMessage id="login.error" />}
          {inputError && <FormattedMessage id="login.inputError" />}
        </S.ErrorMessage>
      </S.InputContainer>
      <S.InputContainer>
        <S.InputTitle>
          <FormattedMessage id="login.password" />
        </S.InputTitle>
        <S.Input type="password" value={password} onChange={(e:any) => setPassword(e.target.value)}/>
      </S.InputContainer>
      <S.LoginButton onClick={handleLogin}>
        <FormattedMessage id="login.button" />
      </S.LoginButton>
    </S.LoginContainer>
  </S.MainContainer>)
};