import React, { PureComponent } from 'react'
import moment from 'moment'
import {
  Modal,
  Form,
  FormGroup,
  FormControl,
  Col,
  ButtonGroup,
  Button,
} from 'react-bootstrap'

const statusMessages = {
  0: '待处理',
  1: '成功',
  2: '失败',
}

export default class C extends PureComponent {
  state = {
    recharge: undefined, // 充值金额
    rechargeFileString: '', // 充值截图数据字符串
    rechargeFileName: '', // 充值截图文件名
    searchModalShow: false, // 搜索弹出框
    chargeModalShow: false, // 充值弹出框
    detailModalShow: false, // 详情弹出框
    detailId: undefined, // 充值详情 id
    searchConditions: [0, 1, 2], // 充值查血条件
  }

  handleRechargeChange = e => { // 设置充值金额
    this.setState({
      recharge: e.target.value,
    })
  }

  handleRechargeFileChange = e => { // 设置充值截图文件
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      this.setState({
        rechargeFileName: file.name,
        rechargeFile: file,
        rechargeFileString: reader.result,
      })
    }
    reader.readAsDataURL(file)
  }

  handleRecharge = e => { // 提交充值
    e.preventDefault()
    const { recharge, rechargeFile, rechargeFileName, rechargeFileString } = this.state
    const rmb = Number(recharge)
    if (!isNaN(rmb) && rechargeFile && rmb > 0) {
      const data = {
        uesrid: this.props.portal.userid,
        recharge: rmb.toFixed(2),
        rechargeFileName,
        rechargeFileString,
        searchConditions: this.state.searchConditions.join(','),
      }
      this.props.postAgentRecharge(data)
      this.setState({
        chargeModalShow: false,
      })
    }
  }

  handleStatusCheck = status => () => { // 设置查询条件
    this.setState({
      searchConditions: status,
    }, () => {
      this.handleSearch()
    })
  }

  handleSearch = () => { // 搜索
    this.setState({ searchModalShow: false }, () => {
      this.fetchRecharges()
    })
  }

  fetchRecharges = () => { // 获取数据
    this.props.getAgentRecharges({
      userid: this.props.portal.userid,
      searchConditions: this.state.searchConditions.join(','),
    })
  }

  handleClickDetail = detailId => () => { // 处理点击详情
    this.setState({
      detailId,
    }, () => {
      this.setState({
        detailModalShow: true,
      })
    })
  }

  showModal = modalName => () => { // 打开弹出框
    this.setState({ [`${modalName}ModalShow`]: true })
  }


  hideModal = modalName => () => { // 关闭弹出框
    this.setState({ [`${modalName}ModalShow`]: false })
  }

  componentDidMount() {
    if (this.props.agentRecharges.length === 0) {
      this.fetchRecharges()
    }
  }

  render() {
    const { agentRecharges } = this.props
    const { searchConditions, detailId, recharge, rechargeFileString } = this.state

    const detail = detailId && agentRecharges.filter(v => v.id === detailId)[0]

    return (
      <div style={{ paddingBottom: '60px' }}>
        <div style={{ backgroundColor: '#f2f2f2', padding: '10px 20px', borderBottom: '1px solid #eee' }}>
          <div className="row" style={{ position: 'relative' }}>
            <div style={{ textAlign: 'center' }}>
              <ButtonGroup>
                <Button
                  bsStyle={searchConditions.length === 3 ? 'success' : 'default'}
                  onClick={this.handleStatusCheck([0, 1, 2])}
                >
                  全部
                </Button>
                <Button
                  bsStyle={searchConditions.length === 1 && searchConditions[0] === 1 ? 'success' : 'default'}
                  onClick={this.handleStatusCheck([1])}
                >
                  全部
                </Button>
                <Button
                  bsStyle={searchConditions.length === 1 && searchConditions[0] === 0 ? 'success' : 'default'}
                  onClick={this.handleStatusCheck([0])}
                >
                  全部
                </Button>
                <Button
                  bsStyle={searchConditions.length === 1 && searchConditions[0] === 2 ? 'success' : 'default'}
                  onClick={this.handleStatusCheck([2])}
                >
                  全部
                </Button>
              </ButtonGroup>
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
              <h6>充值状态</h6>
              <div className="" style={{}}>
                <label className="checkbox-inline">
                  <input checked={searchConditions[0]} onChange={this.handleStatusCheck(0)} type="checkbox" /> 待完成
                </label>
                <label className="checkbox-inline">
                  <input checked={searchConditions[1]} onChange={this.handleStatusCheck(1)} type="checkbox" /> 成功
                </label>
                <label className="checkbox-inline">
                  <input checked={searchConditions[2]} onChange={this.handleStatusCheck(2)} type="checkbox" /> 失败
                </label>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="warning" onClick={this.hideModal('search')}>取消</Button>
              <Button bsStyle="info" onClick={this.handleSearch}>确认</Button>
            </Modal.Footer>
          </Modal>
          <Modal
            show={this.state.chargeModalShow}
            onHide={this.hideModal('charge')}
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
                <FormGroup controlId="formHorizontalEmail">
                  <Col sm={12}>
                    <FormControl
                      bsSize="large"
                      onChange={this.handleRechargeChange}
                      value={recharge}
                      type="number"
                      placeholder="充值金额"
                    />
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalPassword">
                  <Col sm={12}>
                    <label style={{ display: 'block', width: '100%' }}>
                      <a
                        style={{ display: 'block', width: '100%' }}
                        className="btn btn-info btn-lg"
                      >
                        {rechargeFileString ? '更改转账截图' : '上传转账截图'}
                      </a>
                      <FormControl
                        style={{ display: 'none' }}
                        onChange={this.handleRechargeFileChange}
                        type="file"
                        accept="image/png,image/jpg,image/jpeg"
                        placeholder="转账截图"
                      />
                    </label>
                    <div style={{ textAlign: 'center' }}>
                      {
                        rechargeFileString ?
                          <img style={{ height: '320px', marginTop: '5px' }} src={rechargeFileString} alt="" /> :
                          undefined
                      }
                    </div>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col smOffset={2} sm={10}>
                    <Button
                      disabled={!rechargeFileString || isNaN(Number(recharge)) || Number(recharge) <= 0}
                      style={{ width: '100%' }} type="submit" className="btn-success btn-lg"
                    >
                      提交充值申请
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </Modal.Body>
          </Modal>
          <Modal
            show={this.state.detailModalShow}
            onHide={this.hideModal('detail')}
            dialogClassName="custom-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-lg">充值详情</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                detailId ?
                  <table className="detail-table">
                    <tr>
                      <td width="40%">
                        充值时间:
                      </td>
                      <td>
                        {moment(detail.applydate).format('YYYY-MM-DD HH:mm:ss')}
                      </td>
                    </tr>
                    <tr>
                      <td>充值金额:</td>
                      <td>
                        {detail.payrmb}
                      </td>
                    </tr>
                    <tr>
                      <td>金币数量:</td>
                      <td>
                        {detail.gamecoins}
                      </td>
                    </tr>
                    <tr>
                      <td>充值状态:</td>
                      <td>
                        {statusMessages[detail.status]}
                      </td>
                    </tr>
                    <tr>
                      <td>备注:</td>
                      <td>
                        {detail.remark}
                      </td>
                    </tr>
                    <tr>
                      <td>转账截图:</td>
                      <td />
                    </tr>
                  </table> : undefined
              }
            </Modal.Body>
            <div style={{ padding: '0 15px 15px 15px' }}>
              {
                detail ?
                  <img
                    style={{ height: '320px' }}
                    src={`${detail.uploadimgurl}`}
                    alt=""
                  /> : undefined
              }
            </div>
          </Modal>
          <style>{`
          .agent-recharge-table-container {overflow: auto}
          .agent-recharge-container th, .agent-recharge-container td {word-break: keep-all}
          .agent-recharge-container p {color: #444; font-size: 16px}
        `}</style>
          {
            agentRecharges.map(v => {
              const { id, applydate, payrmb, status } = v
              let statusIndicator = '#f0ad4e'
              if (status === 1) {
                statusIndicator = '#5cb85c'
              }
              if (status === 2) {
                statusIndicator = '#d9534f'
              }

              return (
                <div key={id} className="border-bottom player-recharge-item">
                  <div className="cf">
                    <div className="fl" style={{ width: '50%' }}>
                      充值金额: {payrmb}
                      <div className="text-hint" style={{ paddingTop: '5px' }}>
                        {moment(applydate).format('YYYY-MM-DD HH:mm:ss')}
                      </div>
                    </div>
                    <div className="fl" style={{ width: '50%', textAlign: 'right' }}>
                      <div>
                        <span style={{ fontSize: '12px', color: statusIndicator }}>{statusMessages[status]}</span>
                      </div>
                      <div>
                        <a
                          onClick={this.handleClickDetail(id)}
                          style={{ fontSize: '12px', color: '#5cb85c' }}
                        >
                          详情
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
          <div className="recharge-button-ctn">
            <Button bsStyle="success" onClick={this.showModal('charge')}>
              充值
            </Button>
          </div>
        </div>
      </div>
    )
  }
}
