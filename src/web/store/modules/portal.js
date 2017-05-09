// Constants
// --------------------------------------------------
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

// Actions
// --------------------------------------------------
export const login = user => ({
  type: LOGIN,
  http: { method: 'post', url: '/api/login', data: { user } },
})

export const logout = () => ({
  type: LOGOUT,
  http: { method: 'post', url: '/api/logout' },
})

// Reducer
// --------------------------------------------------
export default (state = {}, action) => {
  switch (action.type) {
    case `${LOGIN}_SUCCESS`:
      return action.payload
    case `${LOGOUT}_SUCCESS`:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
