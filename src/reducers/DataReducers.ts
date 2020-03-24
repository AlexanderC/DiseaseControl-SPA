import { AnyAction } from "redux";
import {
  GET_HOSPITAL_DATA,
  GET_TAGS_DATA,
  UPDATE_INVENTORY_ITEM_COUNT,
  GET_USER_PROFILE,
} from "../actions/types";
import { Hospital, Tag, TagColors } from "../resources/types";

const colors = ["primary", "secondary", "warning", "success", "danger", "info"];

const getTagColors = (tags: Tag[]) => {
  const tagColors: {
    [s: string]: string;
  } = {};

  tags.forEach((t, i) => (tagColors[t.id] = colors[i % colors.length]));

  return tagColors;
};

type HopitalsState = {
  data: Hospital[];
  tags: Tag[];
  tagColors: TagColors;
  user: Object | null;
};

const initialState: HopitalsState = {
  data: [],
  tags: [],
  tagColors: {},
  user: null,
};

export default (state = initialState, action: AnyAction): HopitalsState => {
  switch (action.type) {
    case GET_HOSPITAL_DATA:
      return {
        ...state,
        data: action.payload,
      };

    case GET_TAGS_DATA:
      return {
        ...state,
        tags: action.payload,
        tagColors: getTagColors(action.payload),
      };

    case UPDATE_INVENTORY_ITEM_COUNT:
      return {
        ...state,
        data: state.data.map((h) =>
          action.payload.id === h.id ? action.payload : h
        ),
      };

    case GET_USER_PROFILE:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
