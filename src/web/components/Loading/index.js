import { connect } from 'react-redux'

import { logout } from '../../store/modules/portal'

import Loading from './Loading.jsx'

const mapStateToProps = state => ({
  app: state.app,
  portal: state.portal,
})

export default connect(mapStateToProps, { logout })(Loading)
