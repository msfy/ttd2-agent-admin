import pool from '../databases/mysql'

export default async userid => {
  const conn = await pool.getConnection()
  const result = await conn.execute(
    'SELECT * FROM `u_account` WHERE `userid` = ?',
    [userid],
  )
  const users = result[0]
  const coinsCountsResults = await conn.execute(
    'SELECT sum(payrmb) as totalApplyRmb, sum(gamecoins) as totalApplyCoins FROM `u_agentpayapply` WHERE `userid` = ? AND `status` = ?',
    [users[0].userid, 1],
  )
  const portal = {
    ...users[0],
    isLogin: true,
    totalApplyRmb: coinsCountsResults[0][0].totalApplyRmb,
    totalApplyCoins: coinsCountsResults[0][0].totalApplyCoins,
  }
  conn.release()
  return portal
}
