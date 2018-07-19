import React, { Component } from 'react'
import axios from 'axios';
import {WingBlank} from 'antd-mobile'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as chatuserAction from '@actions/chatuserAction'
import UserCard from '@components/UserCard/UserCard'
import storage from 'good-storage'

import '@common/styles/boss.scss'

class Genius extends Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){
    this.props.get_userlist('boss')
  }
  render() {
    return (
      <div className="boss-page">
        <WingBlank>
          <UserCard type="boss" userlist={this.props.userlist}></UserCard>
        </WingBlank>
      </div>
    )
  }
}
export default connect(
  state=>state.chatuserReducer,
  (dispatch)=>bindActionCreators(chatuserAction,dispatch)
)(Genius)
