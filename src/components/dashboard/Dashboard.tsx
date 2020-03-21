import React from "react";
import * as S from './Dashboard.style';
import { useHistory } from 'react-router-dom';
import elements from './data';
import hospitalIcon from '../../resources/icons/hospital.png';

function sliceStringAndAppendDots(str: string, sliceAt = 15) {
  let slicedString = str || '';
  if (slicedString.length > sliceAt) {
    slicedString = `${slicedString.slice(0, sliceAt)}...`;
  }
  return slicedString;
}


const data: any[] = elements;

export default function Dashboard() {
  const history = useHistory();

  const handleDetailsClick = (id: number) => {
    history.push(`/details/${id}`)
  }

  return (<S.Dashboard>
    <S.DashboardList>
      {
        data.map(d => (
          <S.DetailsContainer onClick={() => handleDetailsClick(d.id)}>
            <S.Title>
              {sliceStringAndAppendDots(d.name, 35)}
            </S.Title>
            <S.Description>
              {sliceStringAndAppendDots(d.description, 100)}
            </S.Description>
            <S.Image src={hospitalIcon}/>
            <S.ParametersList>
              {
                d.parameters.map((p:any) => (
                  <S.ParameterContainer>
                    <S.ParameterTitle>{p.title}</S.ParameterTitle>
                    <S.ParameterCount>{p.count}</S.ParameterCount>
                  </S.ParameterContainer>
                ))
              }
            </S.ParametersList>
          </S.DetailsContainer>
        ))
      }
    </S.DashboardList>
  </S.Dashboard>)
};