import React, { Component } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as userAction from '@actions/userAction'
import {Result,List,WhiteSpace,Modal} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import cookies from 'browser-cookies';

const Item = List.Item;
const Brief = Item.Brief;
const Alert = Modal.alert;

class User extends Component {
  logout(){
    const alertInstance = Alert('警告', '确认退出登录吗?', [
      { text: '取消', onPress: () => console.log('cancel')},
      { text: '确认', onPress: () => {
        cookies.erase('userid');
        this.props.logout_submit()
      } },
    ]);
  }
  render() {
    const props=this.props
    const src = props.avatar && '/' + require('@common/images/'+props.avatar+'.png');
    return props.user?(
      <div className="user-page">
        <Result
          img={<img style={{width:'80%'}} src={src}/>}
          title={props.user}
          message={props.company?<div>公司:{props.company}</div>:null}
        />
        <List renderHeader={()=>'简介'}>
          <Item multipleLine>
            {props.title}
            {
              props.desc&&props.desc.split('\n').map((v,i)=>{
                return <Brief key={i}>{v}</Brief>
              })
            }
            {props.money?<Brief>薪资:{props.money}</Brief>:null}
          </Item>
        </List>
        <WhiteSpace/>
        <List>
            <Item onClick={this.logout.bind(this)}>退出登录</Item>
        </List>
      </div>
    ):<Redirect to={props.redirectTo}/>
  }
}
export default connect(
  state=>state.userReducer,
  (dispatch)=>bindActionCreators(userAction,dispatch)
)(User)
