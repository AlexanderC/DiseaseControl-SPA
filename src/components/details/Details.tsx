import React, {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import * as S from './Details.style';
import elements from '../dashboard/data';
import hospitalIcon from '../../resources/icons/hospital.png';
import * as T from '../../resources/types';
import { connect } from "react-redux";
import { getHospitals } from '../../actions/DataActions';

type Props = {
  data: T.Data[],
  getHospitals: () => void
}

function Details({ data, getHospitals }: Props) {
  const params: any = useParams();
  const [details, setDetails] = useState<T.Data>(T.defaultData);

  useEffect(() => {
    if (data && data.length) {
      const element = data.find(d => d.id === parseInt(params.id)) || T.defaultData;
      setDetails(element);
    } else {
      getHospitals();
    }
  }, [data])

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

const mapStateToProps = (state:any) => ({ data: state.data.data})

const mapDispatchToProps = {
  getHospitals
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);