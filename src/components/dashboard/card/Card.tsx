import React from "react";
import * as S from './Card.style';

const data: any[] = [];

export default function Card() {
  return (<S.DetailsContainer>
    <S.Title />
    <S.ParametersList>
      {
        data.map(d => (
          <S.ParameterContainer>
            <S.ParameterTitle>{d.title}</S.ParameterTitle>
            <S.ParameterCount>{d.count}</S.ParameterCount>
          </S.ParameterContainer>
        ))
      }
    </S.ParametersList>
  </S.DetailsContainer>)
};