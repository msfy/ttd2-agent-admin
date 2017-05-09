import React, { PureComponent } from 'react'
import {
  Modal,
  Form,
  FormGroup,
  FormControl,
  Col,
  ControlLabel,
  Button,
  Label,
} from 'react-bootstrap'

const statusMessages = {
  0: '待处理',
  1: '成功',
  2: '失败',
}

export default class C extends PureComponent {
  state = {
    recharge: 0, // 充值金额
    rechargeFileString: '', // 充值截图数据字符串
    rechargeFileName: '', // 充值截图文件名
    searchModalShow: false, // 搜索弹出框
    chargeModalShow: false, // 充值弹出框
    detailModalShow: false, // 详情弹出框
    detailId: undefined, // 充值详情 id
    searchConditions: { // 充值查血条件
      0: true, // 待处理
      1: true, // 成功
      2: true, // 失败
    },
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
        searchConditions: Object.keys(this.state.searchConditions).filter(k => this.state.searchConditions[k]).join(','),
      }
      this.props.postAgentRecharge(data)
      this.setState({
        chargeModalShow: false,
      })
    }
  }

  handleStatusCheck = status => e => { // 设置查询条件
    this.setState({
      searchConditions: {
        ...this.state.searchConditions,
        [status]: e.target.checked,
      },
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
      searchConditions: Object.keys(this.state.searchConditions).filter(k => this.state.searchConditions[k]).join(','),
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
                <Col componentClass={ControlLabel} sm={2}>
                  充值金额
                </Col>
                <Col sm={10}>
                  <FormControl
                    onChange={this.handleRechargeChange}
                    value={recharge}
                    type="number"
                    placeholder="充值金额"
                  />
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={2}>
                  转账截图
                </Col>
                <Col sm={10}>
                  <label style={{ display: 'block', width: '100%' }}>
                    <a style={{ display: 'block', width: '100%' }} className="btn btn-info">{rechargeFileString ? '点击更改' : '点击上传'}</a>
                    <FormControl
                      style={{ display: 'none' }}
                      onChange={this.handleRechargeFileChange}
                      type="file"
                      accept="image/png,image/jpg,image/jpeg"
                      placeholder="转账截图"
                    />
                  </label>
                  {
                    rechargeFileString ?
                      <img style={{ width: '100%' }} src={rechargeFileString} alt="" /> :
                      undefined
                  }
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button disabled={!rechargeFileString || isNaN(Number(recharge)) || Number(recharge) <= 0} style={{ width: '100%' }} type="submit" className="btn-success">
                    提交充值申请
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideModal('charge')}>取消</Button>
          </Modal.Footer>
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
            <h6>记录详情</h6>
            {
              detailId ?
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <h6>充值ID: </h6>
                    <p>{detail.userid}</p>
                  </div>
                  <div className="col-12 col-lg-6">
                    <h6>申请日期: </h6>
                    <p>{detail.applydate}</p>
                  </div>
                  <div className="col-12 col-lg-6">
                    <h6>充值金额: </h6>
                    <p>{detail.payrmb}</p>
                  </div>
                  <div className="col-12 col-lg-6">
                    <h6>金币数量: </h6>
                    <p>{detail.gamecoins}</p>
                  </div>
                  <div className="col-12 col-lg-6">
                    <h6>充值状态: </h6>
                    <p>{statusMessages[detail.status]}</p>
                  </div>
                  <div className="col-12 col-lg-6">
                    <h6>充值备注: </h6>
                    <p>{detail.remark}</p>
                  </div>
                  <div className="col-12 col-lg-12">
                    <h6>转账截图: </h6>
                    <p style={{ overflow: 'auto' }}>
                      <img src={`${detail.uploadimgurl}`} alt="" />
                    </p>
                  </div>
                </div> : undefined
            }
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideModal('detail')}>取消</Button>
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
            <Button bsStyle="success" onClick={this.showModal('charge')}>
              充值
            </Button>
          </div>
        </div>
        {
          searchConditions ?
            <div style={{ color: '#888', marginBottom: '5px', fontSize: '13px' }}>当前查询的是状态为:&nbsp;
              <Label bsStyle="info">&nbsp;{Object.keys(this.state.searchConditions).filter(k => this.state.searchConditions[k]).map(v => statusMessages[v]).join(', ')}&nbsp;</Label>&nbsp;的充值记录</div> :
            undefined
        }
        <div className="agent-recharge-table-container">
          <table className="table table-responsive">
            <thead>
              <tr>
                <th>ID</th>
                <th>提交时间</th>
                <th>充值金额</th>
                <th>备注</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {
                agentRecharges.map(v => {
                  const { id, applydate, payrmb, remark, status } = v
                  const date = new Date(applydate)
                  const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
                  return (
                    <tr key={`${id}`}>
                      <td>{id}</td>
                      <td>{dateString}</td>
                      <td>{payrmb}</td>
                      <td>{remark}</td>
                      <td>{statusMessages[status]}</td>
                      <td>
                        <button onClick={this.handleClickDetail(id)} className="btn btn-sm btn-primary">详情</button>
                      </td>
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
