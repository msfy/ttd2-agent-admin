import React, { PureComponent } from 'react'

import { Link } from 'react-router-dom'

export default class C extends PureComponent {
  render() {
    return (
      <div className="container" style={{ marginTop: '10px' }}>
        <div className="home-coin-ctn">
          当前金币数：
          <div>{this.props.portal.gamecoins}</div>
        </div>
        <ul className="nav navbar-nav home-dash-board">
          <li><Link to="/agentRecharges">申请充值</Link></li>
          <li><Link to="/playerRecharges">玩家充值</Link></li>
          <li><Link to="/analytics">信息总计</Link></li>
          <li><Link to="/userInfo">个人信息</Link></li>
        </ul>
      </div>
    )
  }
}
