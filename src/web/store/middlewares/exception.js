import { throwException } from '../modules/app'

export default function httpMiddleware({ dispatch }) {
  return next => action => {
    const { error, ...rest } = action

    if (!error) {
      return next(action)
    }

    dispatch(throwException({
      error,
      ...rest,
    }))
    return next(action)
  }
}
