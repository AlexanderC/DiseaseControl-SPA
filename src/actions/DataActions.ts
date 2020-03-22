import axios from '../services/Axios';
import * as T from './types';


const currentUser = JSON.parse(localStorage.getItem('currentUser'));

export function getHospitals() {
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

export function getTags() {
  return function (dispatch) {
    return axios.get(`/tag?token=${currentUser.token}`).then(({data }) => {
      dispatch({
        type: T.GET_TAGS_DATA,
        payload: data
      })
      })
      .catch(error => {
        console.log(error, 'error')
      })
  }
}