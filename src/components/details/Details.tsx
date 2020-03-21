import React from "react";
import { useParams } from 'react-router-dom';
import * as S from './Details.style';
import elements from '../dashboard/data';
import hospitalIcon from '../../resources/icons/hospital.png';

type Data = {
  id: number,
  name: string,
  description: string,
  parameters: { title: string; count: number; }[],
  events: { time: string; type: string; inventoryType: string; userId: string; }[]
}


export default function Details() {
  const params: any = useParams();
  const data: Data = elements.find(el => el.id === parseInt(params.id)) || {
    id: 0,
    name: '',
    description: '',
    parameters: [],
    events: []
  };

  return (
    <S.DetailsContainer>
      <S.DataContainer>
        <S.Title>{data.name}</S.Title>
        <S.Image src={hospitalIcon}/>
        <S.Description>{data.description}</S.Description>
        <S.ParametersList>
          {data.parameters.map(p => (
            <S.Parameter>
              <S.ParameterTitle>{p.title}</S.ParameterTitle>
              <S.ParameterCountContainer>
                <S.ActionButton>-</S.ActionButton>
                <S.Count>{p.count}</S.Count>
                <S.ActionButton>+</S.ActionButton>
              </S.ParameterCountContainer>
            </S.Parameter>
          ))}
        </S.ParametersList>
      </S.DataContainer>

      <S.HistoryList>
        {data.events.map(e => (
          <S.HistoryItem>
            <S.DateTime>{e.time}</S.DateTime>
            <S.EventTitle>{e.inventoryType}</S.EventTitle>
            <S.EventOrigin>{e.type}</S.EventOrigin>
          </S.HistoryItem>
        ))}
      </S.HistoryList>
    </S.DetailsContainer>
  );
};