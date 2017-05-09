import { connect } from 'react-redux'

import { throwException } from '../../store/modules/app'

import Exception from './Exception.jsx'

const mapStateToProps = state => ({
  app: state.app,
})

export default connect(mapStateToProps, { throwException })(Exception)
