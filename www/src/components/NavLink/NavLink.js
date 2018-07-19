import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as userAction from '@actions/userAction'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import storage from 'good-storage'

class NavLink extends Component {
  render() {
    const navList = this.props.data.filter(v=>v.hide!==true)
    const {pathname} = this.props.location;
    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
      >
        {
            navList.map((v,i)=>{
                return (
                    <TabBar.Item
                        badge={v.path==='/msg'&&this.props.chat.unread}
                        title={v.text}
                        key={i}
                        icon={{uri:'/'+require('@common/images/'+v.icon+'.png')}}
                        selectedIcon={{uri:'/'+require('@common/images/'+v.icon+'-active.png')}}
                        selected={pathname===v.path}
                        onPress={()=>{
                            this.props.history.push(v.path)
                            this.props.change_path(v.path)
                            storage.set('__path__',v.path) 
                        }}
                    ></TabBar.Item>
                )
            })
        }
        
      </TabBar>
    )
  }
}
NavLink.propTtpes={
    data:PropTypes.array.isRequired
}
export default connect(
    state=>{
        return {
            user:state.userReducer,
            chat:state.chatReducer
        }
    },
    (dispatch)=>bindActionCreators(userAction,dispatch)
)(withRouter(NavLink))
