import React, { useEffect, useMemo } from "react";
import { RouteComponentProps } from 'react-router-dom';
import * as S from './Details.style';
import { useSelector, useDispatch } from "react-redux";
import { getHospitals } from '../../actions/DataActions';
import { selectHospitals } from "../../reducers/Combiner";

function Details(props: RouteComponentProps<{ id: string }>) {
  const { match } = props
  const hospitalId = parseInt(match.params.id);
  const dispatch = useDispatch()
  const hospitals = useSelector(selectHospitals)
  const details = useMemo(() => (
    hospitals.find(d => d.id === hospitalId)
  ), [hospitals, hospitalId]);

  useEffect(() => {
    if (!details) {
      dispatch(getHospitals())
    }
  }, [dispatch, details])

  if (!details) return null

  return (
    <S.DetailsContainer>
      <S.DataContainer>
        <S.Title>{details.name}</S.Title>
        <S.Description>{details.description}</S.Description>
        <S.ParametersList>
          {details.inventory.map(p => (
            <S.Parameter>
              <S.ParameterTitle>{p.name}</S.ParameterTitle>
              <S.ParameterCountContainer>
                <S.ActionButton>-</S.ActionButton>
                <S.Count>{p.HospitalInventory.quantity}</S.Count>
                <S.ActionButton>+</S.ActionButton>
              </S.ParameterCountContainer>
            </S.Parameter>
          ))}
        </S.ParametersList>
      </S.DataContainer>

      <S.HistoryList>
        {/* {data.events.map(e => (
          <S.HistoryItem>
            <S.DateTime>{e.time}</S.DateTime>
            <S.EventTitle>{e.inventoryType}</S.EventTitle>
            <S.EventOrigin>{e.type}</S.EventOrigin>
          </S.HistoryItem>
        ))} */}
      </S.HistoryList>
    </S.DetailsContainer>
  );
};

export default Details;