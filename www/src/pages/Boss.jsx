import React, { Component } from 'react'
import axios from 'axios';
import {WingBlank} from 'antd-mobile'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as chatuserAction from '@actions/chatuserAction'
import UserCard from '@components/UserCard/UserCard'

import '@common/styles/boss.scss'

class Boss extends Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){
    //获取user列表
    this.props.get_userlist('genius')
  }
  render() {
    return (
      <div className="boss-page">
        <WingBlank>
          <UserCard userlist={this.props.userlist}></UserCard>
        </WingBlank>
      </div>
    )
  }
}
export default connect(
  state=>state.chatuserReducer,
  (dispatch)=>bindActionCreators(chatuserAction,dispatch)
)(Boss)
