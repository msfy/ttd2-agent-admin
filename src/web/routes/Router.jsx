import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

import styles from '../styles'
import Navbar from '../components/Navbar'
import Loading from '../components/Loading'
import Exception from '../components/Exception'

import HomeRoute from './home'
import PortalRoute from './portal'
import UserInfoRoute from './userInfo'
import AgentRechargesRoute from './agentRecharges'
import PlayerRechargesRoute from './playerRecharges'
import AnalyticsRoute from './analytics'

const PrivateRoute = ({ component: Compo, portal, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      portal.isLogin ?
        <Compo {...props} /> :
        <Redirect
          to={{
            pathname: '/portal',
            state: { from: props.location },
          }}
        />
    )}
  />
)

export default class Router extends Component {
  render() {
    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <Navbar />
        <Loading />
        <Exception />
        <Route exact path="/portal" component={PortalRoute} />
        <PrivateRoute exact path="/" portal={this.props.portal} component={PlayerRechargesRoute} />
        <PrivateRoute exact path="/userInfo" portal={this.props.portal} component={UserInfoRoute} />
        <PrivateRoute exact path="/agentRecharges" portal={this.props.portal} component={AgentRechargesRoute} />
        <PrivateRoute exact path="/playerRecharges" portal={this.props.portal} component={PlayerRechargesRoute} />
        <PrivateRoute exact path="/analytics" portal={this.props.portal} component={AnalyticsRoute} />
      </div>
    )
  }
}
