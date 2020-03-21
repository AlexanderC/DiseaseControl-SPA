import React, { useState, useCallback } from "react";
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import * as S from './Login.style';

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const validate = useCallback(() => {
    return true;
  }, [email, password])

  const handleLogin = () => {
    const isValid = validate();

    if (isValid) {
      history.push('/');
      console.log('logged in')
    }
  }

  return (<S.MainContainer>
    <S.LoginContainer>
      <S.LoginTitle>
        Disease Control
      </S.LoginTitle>
      <S.InputContainer>
        <S.InputTitle>
          <FormattedMessage id="login.email" />
        </S.InputTitle>
        <S.Input type="email" value={email} onChange={setEmail}/>
      </S.InputContainer>
      <S.InputContainer>
        <S.InputTitle>
          <FormattedMessage id="login.password" />
        </S.InputTitle>
        <S.Input type="password" value={password} onChange={setPassword}/>
      </S.InputContainer>
      <S.LoginButton onClick={handleLogin}>
        <FormattedMessage id="login.button" />
      </S.LoginButton>
    </S.LoginContainer>
  </S.MainContainer>)
};