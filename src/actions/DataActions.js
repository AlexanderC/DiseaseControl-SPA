import axios from '../services/Axios';
import * as T from './types';

export function getHospitals() {
  return function (dispatch) {
    return axios.get('/hospital').then(({data }) => {
      dispatch({
        type: T.GET_HOSPITAL_DATA,
        payload: data
      })
      })
      .catch(error => {
        console.log(error, 'error')
      })
  }
}