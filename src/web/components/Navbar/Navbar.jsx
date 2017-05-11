import React, { PureComponent } from 'react'
import { Link, Route } from 'react-router-dom'
import { Navbar, Nav, NavDropdown, MenuItem, NavItem } from 'react-bootstrap'

export default class NavBar extends PureComponent {
  logout = e => {
    e.preventDefault()
    this.props.logout()
  }

  handleClick = () => {
    window.location = '/portal'
  }

  render() {
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
          <ul className="nav navbar-nav navbar-right">
            <li><a href="/" onClick={this.logout}>退出</a></li>
          </ul>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
