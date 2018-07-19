import React, { Component } from 'react'
import {BrowserRouter} from 'react-router-dom'
// import {HashRouter} from 'react-router-dom'
import {hashHistory} from 'react-router'

import Routes from './routes.js'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter history={hashHistory}>
        <Routes></Routes>
      </BrowserRouter>
    )
  }
}
