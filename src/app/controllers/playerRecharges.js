import moment from 'moment'
import uuid from 'uuid/v4'

import pool from '../databases/mysql'

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
      u_user.nickname
      FROM u_userorderinfo inner join u_user 
      ON u_userorderinfo.userid = u_user.playerid
      WHERE u_userorderinfo.fromid = ${agentId} 
      AND u_userorderinfo.fromid LIKE '%${searchConditions}%'
      ORDER BY orderdate DESC`,
    )
    conn.release()
    const recharges = result[0]
    res.send(recharges)
  })

  app.post('/api/playerRecharges', async (req, res) => {
    const { agentId, searchConditions, rechargeCoins, rechargePlayerId } = req.body.recharge
    const conn = await pool.getConnection()
    const coinsPerRmbResults = await conn.execute(
      'SELECT `coins_per_rmb` FROM `tb_transaction_factor` ORDER BY id DESC limit 1',
    )
    const playerToRecharges = (await conn.execute(
      `SELECT * FROM u_user WHERE playerid = '${rechargePlayerId}'`,
    ))[0]
    if (playerToRecharges.length !== 1) {
      res.status(400).send(`没有找到ID为 ${agentId} 的玩家`)
      return
    }
    const coinsPerRmb = coinsPerRmbResults[0][0].coins_per_rmb
    await conn.execute(
      `INSERT INTO tb_player_recharge_from_agent (created_date, agent_id, user_id, rmb, coins, _status) VALUES ('${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}', '${agentId}', '${rechargePlayerId}', ${rechargeCoins / coinsPerRmb},${rechargeCoins}, 0)`,
    )
    await conn.execute(
      `INSERT INTO u_userorderinfo (orderid, orderdate, fromid, userid, rmb, gamecoins, orderstatus) VALUES ('${uuid()}', '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}', '${agentId}', '${rechargePlayerId}', ${rechargeCoins / coinsPerRmb},${rechargeCoins}, 0)`,
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

    conn.release()
    const recharges = result[0]
    res.send(recharges)
  })
}
