// Constants
// --------------------------------------------------
export const GET_PLAYER_RECHARGE = 'GET_PLAYER_RECHARGE'
export const POST_PLAYER_RECHARGE = 'POST_PLAYER_RECHARGE'

// Actions
// --------------------------------------------------
export const getPlayerRecharges = query => ({
  type: GET_PLAYER_RECHARGE,
  http: { method: 'get', url: '/api/playerRecharges', params: query },
})

export const postPlayerRecharge = recharge => ({
  type: POST_PLAYER_RECHARGE,
  http: { method: 'post', url: '/api/playerRecharges', data: { recharge } },
})

// Reducer
// --------------------------------------------------
export default (state = [], action) => {
  switch (action.type) {
    case `${GET_PLAYER_RECHARGE}_SUCCESS`:
      return action.payload
    case `${POST_PLAYER_RECHARGE}_SUCCESS`:
      return action.payload
    default:
      return state
  }
}
