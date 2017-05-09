import render from '../render.jsx'

export default app => {
  app.get('/', (req, res) => {
    res.send(
      render({
        req,
        res,
        title: '',
        location: req.url,
      }),
    )
  })

  app.get('/portal', (req, res) => {
    res.send(
      render({
        req,
        res,
        title: '梅花UI组件',
        location: req.url,
      }),
    )
  })

  app.get('/agentRecharges', (req, res) => {
    res.send(
      render({
        req,
        res,
        title: '梅花UI组件',
        location: req.url,
      }),
    )
  })

  app.get('/playerRecharges', (req, res) => {
    res.send(
      render({
        req,
        res,
        title: '梅花UI组件',
        location: req.url,
      }),
    )
  })

  app.get('/analytics', (req, res) => {
    res.send(
      render({
        req,
        res,
        title: '梅花UI组件',
        location: req.url,
      }),
    )
  })
}
