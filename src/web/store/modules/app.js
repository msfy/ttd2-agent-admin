// Constants
// --------------------------------------------------
export const UPDATE_LOADING = 'UPDATE_LOADING'
export const THROW_EXCEPTION = 'THROW_EXCEPTION'

// Actions
// --------------------------------------------------
export const updateLoading = ratio => ({
  type: UPDATE_LOADING,
  payload: ratio,
})

export const throwException = exception => ({
  type: THROW_EXCEPTION,
  payload: exception,
})

const initialState = {
  loading: 1,
  exception: undefined,
}

// Reducer
// --------------------------------------------------
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOADING:
      return { ...state, loading: action.payload }
    case THROW_EXCEPTION:
      return { ...state, exception: action.payload }
    default:
      return state
  }
}
