import render from '../render.jsx'

export default app => {
  app.get('/', (req, res) => {
    res.send(
      render({
        req,
        res,
        title: '控制台',
        location: req.url,
      }),
    )
  })

  app.get('/portal', (req, res) => {
    res.send(
      render({
        req,
        res,
        title: '登录',
        location: req.url,
      }),
    )
  })

  app.get('/agentRecharges', (req, res) => {
    res.send(
      render({
        req,
        res,
        title: '加盟商充值',
        location: req.url,
      }),
    )
  })

  app.get('/userInfo', (req, res) => {
    res.send(
      render({
        req,
        res,
        title: '加盟商信息',
        location: req.url,
      }),
    )
  })

  app.get('/playerRecharges', (req, res) => {
    res.send(
      render({
        req,
        res,
        title: '玩家充值',
        location: req.url,
      }),
    )
  })

  app.get('/analytics', (req, res) => {
    res.send(
      render({
        req,
        res,
        title: '统计信息',
        location: req.url,
      }),
    )
  })
}
