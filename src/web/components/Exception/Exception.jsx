import React, { PureComponent } from 'react'

import { Alert, Button } from 'react-bootstrap'

export default class NavBar extends PureComponent {
  resolveException = () => {
    this.props.throwException(undefined)
  }

  render() {
    const { exception } = this.props.app
    const style = {
      display: exception ? 'block' : 'none',
      position: 'fixed',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      padding: '20px',
      backgroundColor: 'rgba(0, 0, 0, .4)',
      zIndex: 9999,
    }
    return (
      <div style={style}>
        <Alert bsStyle="info" onDismiss={this.handleAlertDismiss}>
          <h4>亲, 你好!</h4>
          {exception && exception.error && exception.error.response && exception.error.response.data}
          <p style={{ textAlign: 'right', paddingTop: '15px' }}>
            <Button bsStyle="info" onClick={this.resolveException}>知道了</Button>
          </p>
        </Alert>
      </div>
    )
  }
}
