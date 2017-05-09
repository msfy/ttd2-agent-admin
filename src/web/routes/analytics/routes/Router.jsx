import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'

import ColorRoute from './Color.jsx'
import ColorPlateRoute from './ColorPlate.jsx'
import Accordion from '../../../components/Accordion'

export default class Router extends Component {
  render() {
    return (
      <div>
        <div className="ctn">
          <Accordion>
            <Accordion.Panel>
              是
              asdfsaf
              打发打发
              安抚 this的
              <p>
                分配啪啪啪啪啪啪
              </p>
              <p>发的发生</p>
            </Accordion.Panel>
            <Accordion.Panel active>
              是
              asdfsaf
              打发打发
              安抚 this的
              安抚 this的
              安抚 this的
              安抚 this的
              安抚 this的
              安抚 this的
              安抚 this的
              <p>
                分配啪啪啪啪啪啪
              </p>
              <p>发的发生</p>
            </Accordion.Panel>
            <Accordion.Panel active>
              是
              asdfsaf
              打发打发
               安抚 this的
              <p>
                分配啪啪啪啪啪啪
              </p>
              <p>发的发生</p>
            </Accordion.Panel>
          </Accordion>
          <button className="btn-xs btn-primary">
            <span className="icon-huashixin" />梅花
          </button>
          <button className="btn-sm btn-primary">
            <span className="icon-huashixin" />梅花
          </button>
          <button className="btn-md btn-primary">
            <span className="icon-huashixin" />梅花
          </button>
          <button className="btn-lg btn-primary">
            <span className="icon-huashixin" />梅花
          </button>
          <button className="btn-xl btn-primary">
            <span className="icon-huashixin" />梅花
          </button>

          <button className="btn-md  btn-default">
            <span className="icon-huashixin" />梅花
          </button>
          <button className="btn-md  btn-primary">
            <span className="icon-huashixin" />梅花
          </button>
          <button className="btn-md  btn-secondary">
            <span className="icon-huashixin" />梅花
          </button>
          <button className="btn-md  btn-info">
            <span className="icon-huashixin" />梅花
          </button>
          <button className="btn-md  btn-warning">
            <span className="icon-huashixin" />梅花
          </button>
          <button className="btn-md  btn-danger">
            <span className="icon-huashixin" />梅花
          </button>
          <button className="btn-md  btn-success">
            <span className="icon-huashixin" />梅花
          </button>
        </div>

        <Route exact path="/styles" component={ColorRoute} />
        <Route exact path="/styles/color" component={ColorRoute} />
        <Route path="/styles/colorPlate" component={ColorPlateRoute} />
      </div>
    )
  }
}
