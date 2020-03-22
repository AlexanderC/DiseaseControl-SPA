import { combineReducers } from 'redux';
import data from './DataReducers';
import { Hospital } from '../resources/types';

const rootReducer = combineReducers({ data });

export type AppState = ReturnType<typeof rootReducer>

export function selectHospitals(state: AppState): Hospital[] {
    return state.data.data
}

export default rootReducer;