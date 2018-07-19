import React, { Component } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Redirect} from 'react-router-dom'
import * as userAction from '@actions/userAction'
//antd-mobile
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'
//组件
import Logo from '@components/Logo/Logo.js'
//css
import '@common/styles/login.scss'
import CmForm from '@components/CmForm/CmForm'

class Login extends Component {
  constructor(props){
    super(props);
  }
  //登录
  handleLogin(){
    this.props.login(this.props.state)
  }
  //注册
  handleRegister(){
    this.props.history.push('/register')
  }
  render() {
    return (
      <div className="login-page">
        {
          this.props.redirectTo&&this.props.redirectTo!=='/login'?<Redirect to={this.props.redirectTo}/>:null
        }
        <Logo></Logo>
        {
          this.props.msg
          ?
          <p className="error-msg">{this.props.msg}</p>
          :
          null
        }
        <WingBlank>
          <List className="form">
            <InputItem
              clear
              placeholder="输入用户名"
              value={this.props.state.user} 
              onChange={v=>this.props.handleChange('user',v)}>用户名</InputItem>
            <InputItem
              clear
              type="password"
              placeholder="输入密码"
              value={this.props.state.pwd} 
              onChange={v=>this.props.handleChange('pwd',v)}>密码</InputItem>
          </List>
          <WhiteSpace/>
          <Button type="primary" onClick={this.handleLogin.bind(this)}>登录</Button>
          <WhiteSpace/>
          <Button type="primary" onClick={this.handleRegister.bind(this)}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}
export default connect(
  state=>state.userReducer,
  (dispatch)=>bindActionCreators(userAction,dispatch)
)(CmForm(Login))
