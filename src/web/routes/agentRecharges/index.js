import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { getAgentRecharges, postAgentRecharge } from '../../store/modules/agentRecharges'

import Component from './AgentRecharges.jsx'

const mapStateToProps = state => ({
  portal: state.portal,
  agentRecharges: state.agentRecharges,
})

export default withRouter(
  connect(mapStateToProps, {
    getAgentRecharges,
    postAgentRecharge,
  })(Component),
)
