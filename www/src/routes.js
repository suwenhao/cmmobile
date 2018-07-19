import React, { Component } from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'

import AuthRoute from '@components/AuthRoute/AuthRoute'
import LoginJSX from '@pages/Login'
import RegisterJSX from '@pages/Register'
import DashboardJSX from '@pages/Dashboard'
import NotFountJSX from '@pages/NotFount'
import GeniusInfoJSX from '@pages/GeniusInfo'
import BossInfoJSX from '@pages/BossInfo'
import ChatJSX from '@pages/Chat'

export default class Routes extends Component {
  render() {
    return (
      <div>
          <AuthRoute></AuthRoute>
          <Switch>
            <Route path="/bossinfo" component={BossInfoJSX}></Route>
            <Route path="/geniusinfo" component={GeniusInfoJSX}></Route>
            <Route path='/login' component={LoginJSX}></Route>
            <Route path='/register' component={RegisterJSX}></Route>
            <Route path='/chat/:user' component={ChatJSX}></Route>
            <Route path='/404' component={NotFountJSX}></Route>
            <Route component={DashboardJSX}></Route>
          </Switch>
      </div>
    )
  }
}
