import crypto from 'crypto'

import pool from '../databases/mysql'

const md5 = pwd => crypto.createHash('md5').update(pwd).digest('hex')

export default app => {
  app.post('/api/login', async (req, res) => {
    const conn = await pool.getConnection()
    const account = req.body.user.account
    const password = req.body.user.password
    const result = await conn.execute(
      'SELECT * FROM `u_account` WHERE `phone` = ? OR `username` = ?',
      [account, account],
    )
    conn.release()
    const users = result[0]
    if (users.length !== 1 || users[0].pwd !== md5(password)) {
      const portal = { ...req.session.portal, isLogin: false }
      req.session.portal = portal
      res.status(200).send({ ...portal, pwd: undefined })
    } else {
      const coinsCountsResults = await conn.execute(
        'SELECT sum(payrmb) as totalApplyRmb, sum(gamecoins) as totalApplyCoins FROM `u_agentpayapply` WHERE `userid` = ? AND `status` = ?',
        [users[0].userid, 1],
      )
      const chargesCountsResults = await conn.execute(
        'SELECT sum(rmb) as totalPlayerApplyRmb, sum(gamecoins) as totalPlayerApplyCoins FROM `u_userorderinfo` WHERE `fromid` = ?',
        [users[0].userid],
      )
      const portal = {
        ...users[0],
        isLogin: true,
        totalApplyRmb: coinsCountsResults[0][0].totalApplyRmb,
        totalApplyCoins: coinsCountsResults[0][0].totalApplyCoins,
        totalPlayerApplyRmb: chargesCountsResults[0][0].totalPlayerApplyRmb,
        totalPlayerApplyCoins: chargesCountsResults[0][0].totalPlayerApplyCoins,
      }
      req.session.portal = portal
      res.status(200).send({ ...portal, pwd: undefined })
    }
  })

  app.post('/api/logout', (req, res) => {
    const portal = { ...req.session.portal, isLogin: false }
    req.session.portal = {}
    res.status(200).send(portal)
  })

  app.post('/api/register', (req, res) => {
    const user = req.body
    req.session.user = user
    res.status(200).send({
      user,
    })
  })

  app.post('/api/changePassword', (req, res) => {
    const user = req.body
    req.session.user = user
    res.status(200).send({
      user,
    })
  })
}
