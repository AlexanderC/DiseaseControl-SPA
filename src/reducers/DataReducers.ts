import { AnyAction } from "redux";
import {
  GET_HOSPITAL_DATA,
  GET_TAGS_DATA,
  UPDATE_INVENTORY_ITEM_COUNT,
} from "../actions/types";
import { Hospital, Tag, TagColors } from "../resources/types";

const colors = ["primary", "secondary", "warning", "success", "danger", "info"];

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser") || "{}");
}

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
};

const initialState: HopitalsState = {
  data: [],
  tags: [],
  tagColors: {},
};

export default (state = initialState, action: AnyAction): HopitalsState => {
  const { type, id } = getCurrentUser();

  switch (action.type) {
    case GET_HOSPITAL_DATA:
      return {
        ...state,
        data: action.payload.map((hospital: Hospital) => {
          hospital.canManage =
            type === "admin" ||
            hospital.supervisors.map((s) => s.id).includes(id);

          return hospital;
        }),
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

    default:
      return state;
  }
};
