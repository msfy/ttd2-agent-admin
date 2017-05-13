import moment from 'moment'
import uuid from 'uuid/v4'

import pool from '../databases/mysql'
import flashPoral from '../services/getPortalService'

export default app => {
  app.get('/api/playerRecharges', async (req, res) => {
    const searchConditions = req.query.searchConditions
    const agentId = req.query.agentId
    const conn = await pool.getConnection()
    const result = await conn.execute(
      `SELECT 
      u_userorderinfo.orderid,
      u_userorderinfo.userid,
      u_userorderinfo.gamecoins,
      u_userorderinfo.rmb,
      u_userorderinfo.orderstatus,
      u_userorderinfo.orderdate,
      u_user.nickname,
      u_user.headimgurl
      FROM u_userorderinfo inner join u_user 
      ON u_userorderinfo.userid = u_user.playerid
      WHERE u_userorderinfo.fromid = ${agentId} 
      AND u_userorderinfo.userid LIKE '%${searchConditions}%'
      OR u_user.nickname LIKE '%${searchConditions}%'
      ORDER BY orderdate DESC`,
    )
    conn.release()
    const recharges = result[0]
    res.send(recharges)
  })

  app.post('/api/playerRecharges', async (req, res) => {
    if (!req.session.portal || !req.session.portal.isLogin) {
      res.redirect('/')
    }
    const { agentId, searchConditions, rechargeCoins, rechargePlayerId } = req.body.recharge
    const conn = await pool.getConnection()

    const oldCoins = (await conn.execute(
      'SELECT gamecoins from `u_account`WHERE userid = ?',
      [agentId],
    ))[0][0]

    if (Number(rechargeCoins) > oldCoins.gamecoins) {
      res.status(400).send(`你的金币数为:${oldCoins.gamecoins}, 不足以充值${rechargeCoins}`)
      return
    }

    await conn.execute(
      'UPDATE `u_account` SET gamecoins = gamecoins - ? WHERE userid = ?',
      [Number(rechargeCoins), agentId],
    )

    await conn.execute(
      'UPDATE `u_user` SET gamecoins = gamecoins + ? WHERE playerid = ?',
      [Number(rechargeCoins), rechargePlayerId],
    )

    const coinsPerRmbResults = await conn.execute(
      'SELECT `coins_per_rmb` FROM `tb_transaction_factor` ORDER BY id DESC limit 1',
    )
    const playerToRecharges = (await conn.execute(
      `SELECT * FROM u_user WHERE playerid = '${rechargePlayerId}'`,
    ))[0]
    if (playerToRecharges.length !== 1) {
      res.status(400).send(`没有找到账户IS为 ${rechargePlayerId} 的玩家`)
      return
    }
    const coinsPerRmb = coinsPerRmbResults[0][0].coins_per_rmb

    await conn.execute(
      `INSERT INTO u_userorderinfo (orderid, orderdate, fromid, userid, rmb, gamecoins, orderstatus) VALUES ('${uuid()}', '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}', '${agentId}', '${rechargePlayerId}', ${rechargeCoins / 100},${rechargeCoins}, 0)`,
    )
    const result = await conn.execute(
      `SELECT 
      u_userorderinfo.orderid,
      u_userorderinfo.userid,
      u_userorderinfo.gamecoins,
      u_userorderinfo.rmb,
      u_userorderinfo.orderstatus,
      u_userorderinfo.orderdate,
      u_user.nickname
      FROM u_userorderinfo inner join u_user 
      ON u_userorderinfo.userid = u_user.playerid
      WHERE u_userorderinfo.fromid = ${agentId} 
      AND u_userorderinfo.fromid LIKE '%${searchConditions}%'
      ORDER BY orderdate DESC`,
    )

    const portal = await flashPoral(req.session.portal.userid)
    req.session.portal = {
      ...req.session.portal,
      ...portal,
    }

    conn.release()
    const recharges = result[0]
    res.send(recharges)
  })
}
