import { combineReducers } from 'redux'

import portal from './modules/portal'
import app from './modules/app'
import agentRecharges from './modules/agentRecharges'
import playerRecharges from './modules/playerRecharges'

const rootReducer = asyncReducers => combineReducers({
  app,
  portal,
  agentRecharges,
  playerRecharges,
  ...asyncReducers,
})

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return
  /* eslint no-param-reassign: off */
  store.asyncReducers[key] = reducer
  store.replaceReducer(rootReducer(store.asyncReducers))
}

export default rootReducer
