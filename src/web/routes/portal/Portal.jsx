import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import {
  Form,
  FormGroup,
  FormControl,
  Col,
  Button,
} from 'react-bootstrap'

export default class C extends PureComponent {
  state = {
    account: '',
    password: '',
    isLoginKept: false,
  }

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
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    if (this.props.portal.isLogin) {
      return (
        <Redirect to={from} />
      )
    }
    return (
      <div className="container">

        <Form onSubmit={this.handleSubmit}
              horizontal style={{
          marginTop: '40px',
          maxWidth: '400px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        >
          <div style={{ textAlign: 'center', paddingBottom: '30px' }}>
            <img src="http://zgamedaer.oss-cn-shanghai.aliyuncs.com/agent-resources/Icon-72.png" alt="" />
          </div>
          <FormGroup controlId="formHorizontalEmail">
            <Col sm={12}>
              <FormControl bsSize="large" onChange={this.handleChange('account')}
                           value={this.state.username}
                           type="text" placeholder="账号" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col sm={12}>
              <FormControl bsSize="large" onChange={this.handleChange('password')}
                           value={this.state.password}
                           type="password" placeholder="密码" />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={12}>
              <Button style={{ width: '100%' }} bsSize="large" bsStyle="success" type="submit">
                登录
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}
