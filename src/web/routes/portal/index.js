import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { login } from '../../store/modules/portal'

import Component from './Portal.jsx'

const mapStateToProps = state => ({
  portal: state.portal,
})

export default withRouter(
  connect(mapStateToProps, {
    login,
  })(Component),
)
