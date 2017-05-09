import React, { PureComponent } from 'react'
import { ProgressBar } from 'react-bootstrap'

export default class NavBar extends PureComponent {
  render() {
    const { loading } = this.props.app
    const style = {
      display: loading !== 1 ? 'block' : 'none',
      position: 'fixed',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundColor: 'rgba(0, 0, 0, .4)',
      zIndex: 9999,
    }
    return (
      <div style={style}>
        <ProgressBar active now={100} />
      </div>
    )
  }
}
