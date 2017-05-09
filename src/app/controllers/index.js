import portal from './portal'
import agentRecharges from './agentRechages'
import playerRecharges from './playerRecharges'

export default app => {
  portal(app)
  agentRecharges(app)
  playerRecharges(app)
}
