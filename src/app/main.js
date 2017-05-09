import 'regenerator-runtime'
import path from 'path'
import debug from 'debug'
import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
// import connectRedis from 'connect-redis'
import compression from 'compression'
import cors from 'cors'

import conf from '../conf/conf'

import routers from './routers'
import controllers from './controllers'

const log = debug('express')
const app = express()

const { port } = conf

const jsonParser = bodyParser.json({ limit: '2mb' })
const urlencodedParser = bodyParser.urlencoded({ extended: false })
// const RedisStore = connectRedis(session)

app.use(jsonParser)
app.use(urlencodedParser)
app.use(
  session({
    // store: new RedisStore({
    //   host: '121.40.92.7',
    //   prefix: 'ms5.me.session:',
    // }),
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
    cookie: { maxAge: 3600000 },
    secret: 'ms5.me.3.1415926',
  }),
)

app.use(cors())
app.use(compression())
app.use('/static/', express.static(path.resolve(__dirname, '../public/static')))

routers(app)
controllers(app)

app.listen(port, () => {
  log(`App is listening port ${port}`)
})
