import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import {
  Form,
  FormGroup,
  FormControl,
  Col,
  ControlLabel,
  Button,
  Checkbox,
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
        <Form
          onSubmit={this.handleSubmit}
          horizontal
          style={{
            maxWidth: '400px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              账号
            </Col>
            <Col sm={10}>
              <FormControl
                onChange={this.handleChange('account')}
                value={this.state.username}
                type="text"
                placeholder="账号"
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              密码
            </Col>
            <Col sm={10}>
              <FormControl
                onChange={this.handleChange('password')}
                value={this.state.password}
                type="password"
                placeholder="密码"
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Checkbox
                onChange={this.handleChange('isLoginKept')}
                checked={this.state.isLoginKept}
              >
                记住登录
              </Checkbox>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">
                登录
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}
