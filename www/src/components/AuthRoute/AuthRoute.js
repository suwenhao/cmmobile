import React, { Component } from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAction from '@actions/userAction.js'
import storage from 'good-storage'

class AuthRoute extends Component {
  componentDidMount(){
    (async ()=>{
      let {data}=await axios.post('/user/info').then(data=>data);
      //判断是否是登录状态
      //是的话跳到个人中心
      if(data.code===0){
        let path= storage.get('__path__')
        if('/'+data.data.type===this.props.location.pathname){
          storage.set('__path__',this.props.location.pathname)
        }else{
          // location.reload()
        }
        this.props.load_data(data.data)
        console.log(path)
        if(path){
          this.props.history.push(path)
        }else{
          if(data.data.avatar){
            this.props.redirectTo&&this.props.history.push(this.props.redirectTo)
            return;
          }
          this.props.redirectTo&&this.props.history.push(this.props.redirectTo)
          return;
        }
        
      }else{
        const publicList=['/login','/register'];
        const pathname = this.props.location.pathname;
        if(publicList.indexOf(pathname)>-1){
            return null;
        }else{
          this.props.history.push('/login');
          return;
        }
      }
    })()
  }
  render() {
    return (
      null
    )
  }
}
export default connect(
  state=>state.userReducer,
  (dispatch)=>bindActionCreators(userAction,dispatch)
)(withRouter(AuthRoute))