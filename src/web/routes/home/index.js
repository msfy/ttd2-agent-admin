import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Component from './Home.jsx'

const mapStateToProps = state => ({
  portal: state.portal,
})

export default withRouter(
  connect(mapStateToProps)(Component),
)
