import React, { PureComponent } from 'react'

type
Props = {
  portal: any,
}

export default class C extends PureComponent {
  state = {
    account: '',
    password: '',
    isLoginKept: false,
  }

  props: Props

  handleChange = key => e => {
    this.setState({
      [key]: key === 'isLoginKept' ? e.target.checked : e.target.value,
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.login(this.state)
  }

  render() {
    const { userid, createtime, phone, certno, realname, status, gamecoins, invitecode, isLogin, totalApplyCoins, totalApplyRmb, totalPlayerApplyRmb, totalPlayerApplyCoins } = this.props.portal


    return (
      <div className="container" style={{ marginTop: '10px' }}>
        <div className="home-coin-ctn">
          为玩家充值共计：
          <div>
            {this.props.portal.totalPlayerApplyCoins}
            <span style={{ fontSize: '12px', color: '#999' }}>金币</span>
          </div>
          <div style={{ fontSize: '12px', color: '#999', textAlign: 'right' }}>
            折合: {(Number(totalPlayerApplyRmb)).toFixed(2)}</div>
        </div>
        <div className="home-coin-ctn" style={{ marginTop: '10px' }}>
          我的充值统计：
          <div>
            {this.props.portal.totalApplyRmb}
            <span style={{ fontSize: '12px', color: '#999' }}>元</span>
          </div>
          <div style={{ fontSize: '12px', color: '#999', textAlign: 'right' }}>
            累计充值成功金币: {this.props.portal.totalApplyCoins}</div>
        </div>
      </div>
    )
  }
}
