import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Router from '../routes/Router.jsx'

const mapStateToProps = state => {
  return ({
    portal: state.portal,
  })
}

export default withRouter(
  connect(mapStateToProps, {
  })(Router),
)
