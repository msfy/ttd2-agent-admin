import React, { PureComponent } from 'react'

import { Link } from 'react-router-dom'

export default class C extends PureComponent {
  render() {
    return (
      <div className="container">
        <ul className="nav navbar-nav" data-reactid="14">
          <li><Link to="/userInfo">个人信息</Link></li>
          <li><Link to="/agentRecharges">申请充值</Link></li>
          <li><Link to="/playerRecharges">玩家充值</Link></li>
          <li><Link to="/analytics">信息总计</Link></li>
        </ul>
      </div>
    )
  }
}
