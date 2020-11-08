import axios from 'axios'

export const SET_CURRENT_STATS = 'SET_CURRENT_STATS'
export const setCurrentStats = (data) => ({
  type: SET_CURRENT_STATS,
  payload: data
})

export const refreshCurrentStats = () => {
  return async (dispatch) => {
    const response = await axios.post('http://192.168.1.8:8000/graphql', {
      query: '{ player(username: "Zunawe") { username } }'
    })
    dispatch(setCurrentStats(response.data.data))
  }
}
