import React from "react";
import { FormattedMessage } from 'react-intl';
import * as S from './Login.style';

export default function Login() {
  return (<S.MainContainer>
    <S.LoginContainer>
      <S.LoginTitle>
        <FormattedMessage id="login.title" />
      </S.LoginTitle>
      <S.InputContainer>
        <S.InputTitle>
          <FormattedMessage id="login.username" />
        </S.InputTitle>
        <S.Input />
      </S.InputContainer>
      <S.InputContainer>
        <S.InputTitle>
          <FormattedMessage id="login.password" />
        </S.InputTitle>
        <S.Input />
      </S.InputContainer>
      <S.LoginButton>
        <FormattedMessage id="login.button" />
      </S.LoginButton>
    </S.LoginContainer>
  </S.MainContainer>)
};