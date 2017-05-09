/* eslint no-underscore-dangle: off */
import React, { PureComponent } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import createStore from './store/createStore'
import Container from './containers'

const store = createStore(window.__PRELOADED_STATE__)

class Root extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Container />
        </BrowserRouter>
      </Provider>
    )
  }
}

export default Root
