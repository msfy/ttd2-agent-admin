import axios from 'axios'

import { updateLoading } from '../modules/app'

export default function httpMiddleware({ dispatch }) {
  return next => action => {
    const { type, payload, http, ...rest } = action

    if (!http) {
      return next(action)
    }

    const REQUEST = type
    const SUCCESS = `${REQUEST}_SUCCESS`
    const FAILURE = `${REQUEST}_FAILURE`

    next({ ...rest, type: REQUEST })

    const { method = 'get', url, data, params } = http
    dispatch(updateLoading(0.9))
    const promise = axios({
      method,
      url,
      params,
      data,
      timeout: 20000,
    })

    promise.then(
      res => {
        dispatch(updateLoading(1))
        return next({ ...rest, payload: res.data, type: SUCCESS })
      },
    ).catch(error => {
      dispatch(updateLoading(1))
      return next({ ...rest, error, type: FAILURE, payload: error })
    })

    return promise
  }
}
