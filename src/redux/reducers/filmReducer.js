import {
  CHARACTER_LIST,
  GET_MOVIES_SUCCESS,
  GET_SINGLE_MOVIE,
  MOVIES_START,
} from '../actions/constants'
const initialState = {
  films: [],
  film: {},
  characters: [],
}
export const filmReducer = (state = initialState, action) => {
  switch (action.type) {
    case MOVIES_START:
      return {
        ...state,
        current: {},
        loading: true,
      }
    case GET_MOVIES_SUCCESS:
      return {
        ...state,
        films: action.payload,
      }
    case GET_SINGLE_MOVIE:
      return {
        ...state,
        film: action.payload,
      }
    case CHARACTER_LIST:
      let prevChars = state.characters
      let newChars = action.payload
      let newArr = [...prevChars, newChars]
      return {
        ...state,
        characters: newArr,
      }
    default:
      return state
  }
}
