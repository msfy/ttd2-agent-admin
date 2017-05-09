import moment from 'moment'

import pool from '../databases/mysql'
import upload from '../services/upload'

export default app => {
  app.get('/api/agentRecharges', async (req, res) => {
    const searchConditions = req.query.searchConditions
    const userid = req.query.userid
    const conn = await pool.getConnection()
    const result = await conn.execute(
      `SELECT * FROM u_agentpayapply WHERE userid = ${userid} AND status IN(${searchConditions || -1}) ORDER BY id DESC`,
    )
    conn.release()
    const recharges = result[0]
    res.send(recharges)
  })

  app.post('/api/agentRecharges', async (req, res, next) => {
    const { recharge, searchConditions, rechargeFileName, rechargeFileString, uesrid } = req.body

    let file
    try {
      file = await upload(rechargeFileString, rechargeFileName)
    } catch (e) {
      res.status(301)
      next()
    }
    const conn = await pool.getConnection()
    const coinsPerRmbResults = await conn.execute(
      'SELECT `coins_per_rmb` FROM `tb_transaction_factor` ORDER BY id DESC limit 1',
    )
    const coinsPerRmb = coinsPerRmbResults[0][0].coins_per_rmb
    await conn.execute(
      `INSERT INTO u_agentpayapply (applydate, userid, payrmb, uploadimgurl, status, gamecoins) VALUES ('${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}', ${uesrid}, ${recharge}, '${file}', 0, ${recharge * coinsPerRmb})`,
    )
    const result = await conn.execute(
      `SELECT * FROM u_agentpayapply WHERE userid = ${uesrid} AND status IN(${searchConditions || -1}) ORDER BY id DESC`,
    )
    conn.release()
    const recharges = result[0]
    res.send(recharges)
  })
}
