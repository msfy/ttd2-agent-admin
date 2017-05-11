import React, {PureComponent} from 'react'
import {Link, Route} from 'react-router-dom'
import {Navbar, Nav, NavDropdown, MenuItem, NavItem} from 'react-bootstrap'

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
      <div className="navbar__">
        <a href="/">控制台</a>
        <a href="/" onClick={this.logout}>退出</a>
      </div>
    )
  }
}
