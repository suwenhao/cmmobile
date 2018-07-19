import React, { Component } from 'react'
import {NavBar} from 'antd-mobile'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Route,Switch,Redirect} from 'react-router-dom'
import * as userAction from '@actions/userAction.js'
import * as chatAction from '@actions/chatAction.js'

import BossJSX from '@pages/Boss'
import GeniusJSX from '@pages/Genius'
import MsgJSX from '@pages/Msg'
import UserJSX from '@pages/User'
import NavLinkBar from '@components/NavLink/NavLink'

import '@common/styles/dashboard.scss'

class Dashboard extends Component {
  componentDidMount(){
    this.props.chatActions.getMsgList()
    this.props.chatActions.recvMsg()
  }
  render() {
    const user = this.props.user
    const navList=[
        {
            path:'/boss',
            text:'求职',
            icon:'boss',
            title:'求职列表',
            component:BossJSX,
            hide:user.type=='genius'
        },
        {
            path:'/genius',
            text:'BOSS',
            icon:'job',
            title:'BOSS列表',
            component:GeniusJSX,
            hide:user.type=='boss'
        },
        {
            path:'/msg',
            text:'消息',
            icon:'msg',
            title:'消息列表',
            component:MsgJSX
        },
        {
            path:'/me',
            text:'我',
            icon:'user',
            title:'个人中心',
            component:UserJSX
        }
    ]
    const path = this.props.location.pathname;
    return (
      <div className="dashboard-page">
        <NavBar className="dashboard-top" mode="dark">{navList.find(v=>path===v.path)&&navList.find(v=>path===v.path).title}</NavBar>
        <div className="dashboard-content">
            <Switch>
                <Route exact path='/' render={()=><Redirect to={user.redirectTo}/>}></Route>
                {
                    navList.map(v=>{
                        return <Route key={v.path} path={v.path} component={v.component}></Route>
                    })
                }
                <Redirect to={'/404'}/>
            </Switch>
        </div>
        <div className="dashboard-footer">
            <NavLinkBar data={navList}></NavLinkBar>
        </div>
      </div>
    )
  }
}
export default connect(
    state=>({user:state.userReducer}),
    (dispatch)=>{
        return {
            userActions:bindActionCreators(userAction,dispatch),
            chatActions:bindActionCreators(chatAction,dispatch)
        }
    }
)(Dashboard)
