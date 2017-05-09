import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { getPlayerRecharges, postPlayerRecharge } from '../../store/modules/playerRecharges'

import Component from './PlayerRecharges.jsx'

const mapStateToProps = state => ({
  portal: state.portal,
  playerRecharges: state.playerRecharges,
})

export default withRouter(
  connect(mapStateToProps, {
    getPlayerRecharges,
    postPlayerRecharge,
  })(Component),
)
