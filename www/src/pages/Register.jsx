import React, { Component } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Redirect} from 'react-router-dom'
import * as userAction from '@actions/userAction.js'
//antd-mobile
import {List,InputItem,WingBlank,WhiteSpace,Button,Radio} from 'antd-mobile'
const RadioItem = Radio.RadioItem;
//组件
import Logo from '@components/Logo/Logo.js'
//css
import '@common/styles/login.scss'

class Register extends Component {
  constructor(props){
    super(props);
    this.handleRegister=this.handleRegister.bind(this);
    this.state={
      selectIndex:0,
      selects:[
        { value: 0, label: '求职',type:'genius'},
        { value: 1, label: 'BOSS',type:'boss'},
      ],
      user:'',
      pwd:'',
      repeatwd:'',
      type:'genius'
    }
  }
  //注册
  handleRegister(){
    // console.log(this.state);
    this.props.register(this.state)
  }
  //受控组件
  handleChange(key,val){
    if(key=='selectIndex'){
      this.setState({
        [key]:val,
        type:this.state.selects[val].type
      })
    }else{
      this.setState({
        [key]:val,
        type:this.state.selects[this.state.selectIndex].type
      })
    }
  }
  render() {
    return (
      <div className="login-page">
        {
          this.props.redirectTo&&this.props.redirectTo!=='/register'?<Redirect to={this.props.redirectTo}/>:null
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
              value={this.state.user} 
              onChange={v=>this.handleChange('user',v)}>
              用户名
            </InputItem>
            <InputItem
              clear
              placeholder="输入密码"
              type="password"
              value={this.state.pwd} 
              onChange={v=>this.handleChange('pwd',v)}>
              密码
            </InputItem>
            <InputItem
              clear
              placeholder="输入确认密码"
              type="password"
              value={this.state.repeatwd} 
              onChange={v=>this.handleChange('repeatwd',v)}>
              确认密码
            </InputItem>
          </List>
          <WhiteSpace/>
          <List className="form">
            {
              this.state.selects.map((item,i)=>{
                return (
                  <RadioItem 
                    key={i}
                    checked={item.value===this.state.selectIndex}
                    onChange={()=>{
                      this.handleChange('selectIndex',i)
                    }}
                  >
                    {item.label}
                  </RadioItem>
                )
              })
            }
          </List>
          <WhiteSpace/>
          <Button type="primary" onClick={this.handleRegister}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}
export default connect(
  ({userReducer})=>userReducer,
  (dispatch)=>bindActionCreators(userAction,dispatch)
)(Register)