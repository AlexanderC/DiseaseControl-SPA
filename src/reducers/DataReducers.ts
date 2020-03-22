import { AnyAction } from 'redux';
import {
  GET_HOSPITAL_DATA
} from '../actions/types';
import { Hospital } from '../resources/types';

type HopitalsState = {
  data: Hospital[]
}

const initialState: HopitalsState = {
  data: []
}

export default (state = initialState, action: AnyAction): HopitalsState => {
  switch(action.type) {
    case GET_HOSPITAL_DATA:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state;
  }
}