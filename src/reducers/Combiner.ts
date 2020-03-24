import { combineReducers } from "redux";
import data from "./DataReducers";
import { Hospital, Tag, TagColors } from "../resources/types";

const rootReducer = combineReducers({ data });

export type AppState = ReturnType<typeof rootReducer>;

export function selectHospitals(state: AppState): Hospital[] {
  return state.data.data;
}

export function selectTags(state: AppState): Tag[] {
  return state.data.tags;
}

export function selectTagColors(state: AppState): TagColors {
  return state.data.tagColors;
}

export function selectUserProfile(state: AppState): any {
  return state.data.user;
}

export default rootReducer;
