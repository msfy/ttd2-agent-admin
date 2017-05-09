import { connect } from 'react-redux'

import { logout } from '../../store/modules/portal'

import Navbar from './Navbar.jsx'

const mapStateToProps = state => ({
  app: state.app,
  portal: state.portal,
})

export default connect(mapStateToProps, { logout })(Navbar)
