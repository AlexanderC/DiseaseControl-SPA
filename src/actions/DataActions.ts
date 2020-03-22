import axios from "../services/Axios";
import * as T from "./types";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser') || '{}');
}

export function getHospitals() {
  return function(dispatch: any) {
    const currentUser = getCurrentUser();
    return axios
      .get(`/hospital?token=${currentUser.token}`)
      .then(({ data }) => {
        dispatch({
          type: T.GET_HOSPITAL_DATA,
          payload: data
        });
      })
      .catch(error => {
        console.log(error, "error");
      });
  };
}

export function getTags() {
  return function(dispatch: any) {
    const currentUser = getCurrentUser();
    return axios
      .get(`/tag?token=${currentUser.token}`)
      .then(({ data }) => {
        dispatch({
          type: T.GET_TAGS_DATA,
          payload: data
        });
      })
      .catch(error => {
        console.log(error, "error");
      });
  };
}

export function updateInventoryItemCount(
  hospitalId: number,
  inventoryItemId: number,
  count: number
) {
  return (dispatch: Dispatch) => {
    const currentUser = getCurrentUser();
    const url = `/hospital/${hospitalId}/inventory/${inventoryItemId}?token=${currentUser.token}`;
    return axios
      .post(url, { quantity: count })
      .then(({ data }) => {
        return dispatch({
          type: T.UPDATE_INVENTORY_ITEM_COUNT,
          payload: data
        })
      })
      .catch(error => {
        console.log(error, "error");
      });
  };
}

declare module "redux" {
  /*
   * Overload to add thunk support to Redux's dispatch() function.
   * Useful for react-redux or any other library which could use this type.
   */
  interface Dispatch<A extends Action<any> = AnyAction> {
    <TReturnType, TState, TExtraThunkArg>(
      thunkAction: ThunkAction<TReturnType, TState, TExtraThunkArg, A>
    ): TReturnType;
  }
}