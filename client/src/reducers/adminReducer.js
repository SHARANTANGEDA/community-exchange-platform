import { ADD_DEPARTMENT, SET_CURRENT_USER } from '../actions/types'
import isEmpty from '../validation/is-empty'
const initialState = {
  msg: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_DEPARTMENT:
      return {
        ...state,
        msg:action.payload
      }
    default:
      return state;
  }
}