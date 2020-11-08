import { SET_CURRENT_STATS } from '../actions/data'

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_STATS:
      return {
        ...state,
        currentStats: action.payload
      }
    default:
      return state
  }
}

export default reducer
