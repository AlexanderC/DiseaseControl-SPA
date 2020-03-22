import * as T from '../actions/types';

const initialState = {
  data: [],
  tags: [],
  tagColors: []
}

const colors = [
  'primary',
  'secondary',
  'warning',
  'success',
  'danger',
  'info'
]

const getTagColors = tags => {
  const tagColors = {};

  tags.forEach((t, i) => tagColors[t.id] = colors[i % colors.length])

  return tagColors;
}

export default (state = initialState, action) => {
  switch(action.type) {
    case T.GET_HOSPITAL_DATA:
      return {
        ...state,
        data: action.payload
      }
    case T.GET_TAGS_DATA:
      return {
        ...state,
        tags: action.payload,
        tagColors: getTagColors(action.payload)
      }
    default:
      return state;
  }
}