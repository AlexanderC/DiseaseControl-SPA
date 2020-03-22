import axios from '../services/Axios';
import * as T from './types';

export function getHospitals() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  return function (dispatch) {
    return axios.get(`/hospital?token=${currentUser.token}`).then(({data }) => {
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