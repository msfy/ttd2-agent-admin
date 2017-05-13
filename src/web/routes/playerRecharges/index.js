import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { throwException } from '../../store/modules/app'
import { getPlayerRecharges, postPlayerRecharge } from '../../store/modules/playerRecharges'

import Component from './PlayerRecharges.jsx'

const mapStateToProps = state => ({
  portal: state.portal,
  playerRecharges: state.playerRecharges,
})

export default withRouter(
  connect(mapStateToProps, {
    throwException,
    getPlayerRecharges,
    postPlayerRecharge,
  })(Component),
)
