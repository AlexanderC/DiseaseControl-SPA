import React, { useEffect } from "react";
import * as S from './Dashboard.style';
import * as T from '../../resources/types';
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import { getHospitals } from '../../actions/DataActions';

function sliceStringAndAppendDots(str: string, sliceAt = 15) {
  let slicedString = str || '';
  if (slicedString.length > sliceAt) {
    slicedString = `${slicedString.slice(0, sliceAt)}...`;
  }
  return slicedString;
}

type Props = {
  data: T.Data[],
  getHospitals: () => void;
}

function Dashboard({ data, getHospitals } : Props) {
  const history = useHistory();

  useEffect(() => {
    getHospitals();
  }, [getHospitals])

  const handleDetailsClick = (id: number) => {
    history.push(`/details/${id}`)
  }

  return (<S.Dashboard>
    <S.DashboardList>
      {
        data && data.map(d => (
          <S.DetailsContainer
            key={d.id}
            onClick={() => handleDetailsClick(d.id)}
          >
            <S.Title>
              {sliceStringAndAppendDots(d.name, 35)}
            </S.Title>
            <S.Description>
              {sliceStringAndAppendDots(d.description, 100)}
            </S.Description>
            <S.ParametersList>
              {
                d.inventory && d.inventory.map((p:any) => (
                  <S.ParameterContainer key={p.name}>
                    <S.ParameterTitle>{p.name}</S.ParameterTitle>
                    <S.ParameterCount>{p.HospitalInventory.quantity}</S.ParameterCount>
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

const mapStateToProps = (state:any) => {
  return {
    data: state.data.data
  }
}

const mapDispatchToProps = {
  getHospitals
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);