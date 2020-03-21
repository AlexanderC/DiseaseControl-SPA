import {
  GET_HOSPITAL_DATA
} from '../actions/types';

const initialState = {
  data: []
}

export default (state = initialState, action) => {
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