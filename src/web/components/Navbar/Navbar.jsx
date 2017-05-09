import React, { PureComponent } from 'react'
import { Link, Route } from 'react-router-dom'
import { Navbar, Nav, NavDropdown, MenuItem, NavItem } from 'react-bootstrap'

export default class NavBar extends PureComponent {
  logout = () => {
    this.props.logout()
  }

  handleClick = () => {
    window.location = '/portal'
  }

  render() {
    const { isLogin, username, realname, nickname } = this.props.portal
    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/"><span className="glyphicon glyphicon-home" /></a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <ul className="nav navbar-nav" data-reactid="14">
            <li><Link to="/userInfo">个人信息</Link></li>
            <li><Link to="/agentRecharges">申请充值</Link></li>
            <li><Link to="/playerRecharges">玩家充值</Link></li>
            <li><Link to="/analytics">信息总计</Link></li>
          </ul>
          <Nav pullRight>
            {
              isLogin ? (
                <NavDropdown title={`${nickname || realname || username || ''}`} id="basic-nav-dropdown">
                  <MenuItem onSelect={this.logout}>退出登录</MenuItem>
                </NavDropdown>
              ) : <NavItem onClick={this.handleClick} href="/portal">登录/注册</NavItem>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
