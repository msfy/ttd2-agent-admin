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
    console.log(this.props.portal)
    const { userid, createtime, phone, certno, realname, status, gamecoins, invitecode, isLogin } = this.props.portal

    return (
      <div className="container agent-info-container">
        <style>{`
          .agent-info-container h6 {margin-top: 30px; color: #888; font-size: 14px}
          .agent-info-container p {color: #444; font-size: 16px}
        `}</style>
        <h3>统计信息</h3>
        <div className="row">
          <div className="col-12 col-lg-6">
            <h6>玩家充值统计: </h6>
            <p>{userid}</p>
          </div>
          <div className="col-12 col-lg-6">
            <h6>加盟商充值统计: </h6>
            <p>{createtime}</p>
          </div>
        </div>
      </div>
    )
  }
}
