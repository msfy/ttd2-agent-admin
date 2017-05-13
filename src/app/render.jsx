import React from 'react'
import { renderToString } from 'react-dom/server'

import conf from '../conf/conf'
import Root from './Root'

const { publicPath } = conf

export default param => {
  const { location, title, req } = param
  const portal = req.session.portal
    ? req.session.portal
    : { isLogin: false }
  const state = {
    portal,
  }

  const content = renderToString(<Root state={state} location={location} />)

  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="//cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" />
</head>
<body>
    <div id="root">${content}</div>
</body>
<script>window.__PRELOADED_STATE__ = ${JSON.stringify(state)}</script>
<script src="${publicPath}/common/common.js?v=${new Date()}"></script>
<script src="${publicPath}/index/index.js?v=${new Date()}"></script>
</html>
`
}
