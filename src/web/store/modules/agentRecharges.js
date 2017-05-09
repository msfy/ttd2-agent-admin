// Constants
// --------------------------------------------------
export const GET_AGENT_RECHARGE = 'GET_AGENT_RECHARGE'
export const POST_AGENT_RECHARGE = 'POST_AGENT_RECHARGE'

// Actions
// --------------------------------------------------
export const getAgentRecharges = query => ({
  type: GET_AGENT_RECHARGE,
  http: { method: 'get', url: '/api/agentRecharges', params: query  },
})

export const postAgentRecharge = recharge => ({
  type: POST_AGENT_RECHARGE,
  http: { method: 'post', url: '/api/agentRecharges', data: recharge },
})

// Reducer
// --------------------------------------------------
export default (state = [], action) => {
  switch (action.type) {
    case `${GET_AGENT_RECHARGE}_SUCCESS`:
      return action.payload
    case `${POST_AGENT_RECHARGE}_SUCCESS`:
      return action.payload
    default:
      return state
  }
}
