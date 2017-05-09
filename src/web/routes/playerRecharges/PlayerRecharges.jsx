import React, { PureComponent } from 'react'
import {
  Modal,
  Label,
  Form,
  FormGroup,
  FormControl,
  Col,
  ControlLabel,
  Button,
} from 'react-bootstrap'

const statusMessages = {
  0: '待处理',
  1: '成功',
  2: '失败',
}

export default class C extends PureComponent {
  state = {
    rechargePlayerId: '', // 充值玩家 id
    rechargeCoins: 0, // 充值金币
    searchModalShow: false, // 搜索弹出框
    rechargeModalShow: false, // 充值弹出框
    searchConditions: '', // 搜索条件(id查询)
  }

  handleRechargeChange = name => e => { // 处理充值信息变化
    this.setState({
      [name]: e.target.value,
    })
  }

  handleRecharge = e => { // 处理充值
    e.preventDefault()
    const { rechargePlayerId, rechargeCoins, searchConditions } = this.state
    const coins = Number(rechargeCoins)
    if (!isNaN(coins) && rechargePlayerId) {
      const data = {
        agentId: this.props.portal.userid,
        rechargeCoins: coins.toFixed(0),
        rechargePlayerId,
        searchConditions,
      }
      this.props.postPlayerRecharge(data)
      this.setState({
        rechargeModalShow: false,
      })
    }
  }

  handleSearch = () => { // 处理搜索
    this.setState({ searchModalShow: false }, () => {
      this.fetchRecharges()
    })
  }

  fetchRecharges = () => { // 获取充值列表
    this.props.getPlayerRecharges({
      agentId: this.props.portal.userid,
      searchConditions: this.state.searchConditions,
    })
  }

  showModal = modalName => () => { // 打开弹出框
    this.setState({ [`${modalName}ModalShow`]: true })
  }

  hideModal = modalName => () => { // 关闭弹出框
    this.setState({ [`${modalName}ModalShow`]: false })
  }

  componentDidMount() {
    if (this.props.playerRecharges.length === 0) {
      this.fetchRecharges()
    }
  }

  render() {
    const { playerRecharges } = this.props
    const { searchConditions, rechargePlayerId, rechargeCoins } = this.state

    return (
      <div className="container agent-recharge-container">
        <Modal
          show={this.state.searchModalShow}
          onHide={this.hideModal('search')}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">条件筛选</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>玩家Id</h6>
            <div className="" style={{}}>
              <FormControl
                onChange={this.handleRechargeChange('searchConditions')}
                value={searchConditions}
                type="text"
                placeholder="输入要查询的玩家id"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="warning" onClick={this.hideModal('search')}>取消</Button>
            <Button bsStyle="info" onClick={this.handleSearch}>确认</Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={this.state.rechargeModalShow}
          onHide={this.hideModal('recharge')}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">充值</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={this.handleRecharge}
              horizontal
              style={{
                maxWidth: '500px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={2}>
                  玩家Id
                </Col>
                <Col sm={10}>
                  <FormControl
                    onChange={this.handleRechargeChange('rechargePlayerId')}
                    value={rechargePlayerId}
                    type="text"
                    placeholder="玩家Id"
                  />
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                  充值金额
                </Col>
                <Col sm={10}>
                  <FormControl
                    onChange={this.handleRechargeChange('rechargeCoins')}
                    value={rechargeCoins}
                    type="number"
                    placeholder="充值金额"
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button disabled={!rechargePlayerId || isNaN(Number(rechargeCoins)) || Number(rechargeCoins) <= 0} style={{ width: '100%' }} type="submit" className="btn-success">
                    提交充值申请
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideModal('recharge')}>取消</Button>
          </Modal.Footer>
        </Modal>
        <style>{`
          .agent-recharge-table-container {overflow: auto}
          .agent-recharge-container th, .agent-recharge-container td {word-break: keep-all}
          .agent-recharge-container p {color: #444; font-size: 16px}
        `}</style>
        <div className="row" style={{ margin: '5px 0 15px 0' }}>
          <div className="col-xs-6">
            <h5>充值记录</h5>
          </div>
          <div className="col-xs-6" style={{ textAlign: 'right' }}>
            <Button style={{ marginRight: '10px' }} bsStyle="info" onClick={this.showModal('search')}>
              查询
            </Button>
            <Button bsStyle="success" onClick={this.showModal('recharge')}>
              充值
            </Button>
          </div>
        </div>
        {
          searchConditions ?
            <div style={{ color: '#888', marginBottom: '5px', fontSize: '13px' }}> 当前查询玩家Id为&nbsp;
              <Label bsStyle="info">&nbsp;{searchConditions}&nbsp;</Label>&nbsp;的充值记录</div> :
            undefined
        }
        <div className="agent-recharge-table-container">
          <table className="table table-responsive">
            <thead>
              <tr>
                <th>玩家ID</th>
                <th>充值金币</th>
                <th>消耗金额</th>
                <th>充值状态</th>
                <th>充值时间</th>
              </tr>
            </thead>
            <tbody>
              {
                playerRecharges.map(v => {
                  const { orderid, nickname, userid, gamecoins, rmb, orderstatus, orderdate } = v
                  const date = new Date(orderdate)
                  const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
                  return (
                    <tr key={`${orderid}`}>
                      <td>
                        <div>{userid}</div>
                        <span className="label label-warning">{nickname}</span>
                      </td>
                      <td>{gamecoins}</td>
                      <td>{rmb}</td>
                      <td>{statusMessages[orderstatus]}</td>
                      <td>{dateString}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
