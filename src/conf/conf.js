const env = process.env.NODE_ENV || 'development'

const development = {
  env,
  port: 8885,
  publicPath: 'http://localhost:9994',
  resourcesPath: 'cdn.bootcss.com',
}

const production = Object.assign({}, development, {
  port: 8885,
  publicPath: '/static/assets',
})

export default { development, production }[env]
