import React, { PureComponent } from 'react'
import moment from 'moment'
import {
  Modal,
  Form,
  FormGroup,
  FormControl,
  Col,
  Button,
} from 'react-bootstrap'


export default class C extends PureComponent {
  state = {
    rechargePlayerId: '', // 充值玩家 id
    rechargeCoins: undefined, // 充值金币
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
      if (coins % 100 !== 0) {
        this.props.throwException({
          error: { response: { data: '充值金币数需要为100的整数倍' } },
        })
        return
      }

      if (coins > this.props.portal.gamecoins) {
        this.props.throwException({
          error: { response: { data: `你的金币数为: ${this.props.portal.gamecoins}, 不足以为玩家充值 ${coins} 金币` } },
        })
        return
      }

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
    this.fetchRecharges()
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
      <div>
        <div style={{ backgroundColor: '#f2f2f2', padding: '10px 20px', borderBottom: '1px solid #eee' }}>
          <div className="row" style={{ position: 'relative', paddingRight: '90px', paddingLeft: '10px' }}>
            <div>
              <FormControl
                onChange={this.handleRechargeChange('searchConditions')}
                value={searchConditions}
                type="text"
                placeholder="输入玩家游戏账号或昵称"
              />
            </div>
            <div style={{ position: 'absolute', right: 0, top: 0 }}>
              <Button style={{ marginRight: '10px', width: '70px' }} bsStyle="info" onClick={this.handleSearch}>
                查询
              </Button>
            </div>
          </div>
        </div>
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
                  <Col sm={12}>
                    <FormControl
                      bsSize="large"
                      onChange={this.handleRechargeChange('rechargePlayerId')}
                      value={rechargePlayerId}
                      type="text"
                      placeholder="输入玩家账号"
                    />
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalEmail">
                  <Col sm={12}>
                    <FormControl
                      bsSize="large"
                      onChange={this.handleRechargeChange('rechargeCoins')}
                      value={rechargeCoins}
                      type="number"
                      placeholder="输入充值金币数量"
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col sm={12}>
                    <Button
                      bsSize="large"
                      disabled={!rechargePlayerId || isNaN(Number(rechargeCoins)) || Number(rechargeCoins) <= 0}
                      style={{ width: '100%' }} type="submit" className="btn-success"
                    >
                      确认充值
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </Modal.Body>
          </Modal>
          <style>{`
          .agent-recharge-table-container {overflow: auto}
          .agent-recharge-container th, .agent-recharge-container td {word-break: keep-all}
          .agent-recharge-container p {color: #444; font-size: 16px}
        `}</style>
          <div>
            {
              playerRecharges.map(v => {
                const { orderid, headimgurl, nickname, orderdate, gamecoins, userid } = v
                return (
                  <div key={orderid} className="cf border-bottom player-recharge-item">
                    <div className="fl">
                      <img
                        style={{ width: '50px', borderRadius: '50%', marginRight: '10px' }}
                        src={headimgurl}
                        alt=""
                      />
                    </div>
                    <div className="fl">
                      <div style={{ fontSize: '13px', padding: '8px 0 3px 0' }}>
                        充值-{nickname.length > 10 ? `${nickname.substr(0, 9)}...` : nickname}
                      </div>
                      <div style={{ color: '#5cb85c' }}>
                        <span className="text-hint">
                          账号:
                        </span>
                        {userid}
                      </div>
                    </div>
                    <div className="fr">
                      <div style={{ color: '#CCAC00', padding: '8px 0 3px 0' }}>{gamecoins}金币</div>
                      <div className="text-hint">{moment(orderdate).format('YYYY-MM-DD HH:mm:ss')}</div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="recharge-button-ctn">
          <Button bsStyle="success" onClick={this.showModal('recharge')}>
            充值
          </Button>
        </div>
      </div>
    )
  }
}
