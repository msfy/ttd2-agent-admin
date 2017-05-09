module.exports = function (done) {
  if (!done || typeof done !== 'function') throw new Error('Must provide a callback for content-length')

  return function (req, res, next) {
    let byteLength = 0
    const end = res.end
    const write = res.write

    res.write = function (payload) {
      if (payload) byteLength += Buffer.byteLength(payload.toString(), 'utf8')

      res.write = write
      res.write(...arguments)
    }

    res.end = function (payload) {
      if (payload) byteLength += Buffer.byteLength(payload.toString(), 'utf8')

      res.end = end
      res.end(...arguments)

      done(null, byteLength)
    }

    next()
  }
}
