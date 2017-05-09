/* eslint no-underscore-dangle: off */
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import http from './middlewares/http'
import exception from './middlewares/exception'

import createReducer from './reducers'

export default (initialState = {}) => {
  const middleware = [
    thunk,
    http,
    exception,
  ]

  const enhancers = []
  if (process.env.NODE_ENV === 'development') {
    enhancers.push(typeof window !== 'undefined'
      && window.__REDUX_DEVTOOLS_EXTENSION__
      && window.__REDUX_DEVTOOLS_EXTENSION__())
  }

  const store = createStore(
    createReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers,
    ),
  )
  store.asyncReducers = {}

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      /* eslint global-require: 0 */
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
