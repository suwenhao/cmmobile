import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as userAction from '@actions/userAction'
import {Card,WhiteSpace} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import storage from 'good-storage'

class UserCard extends Component {
  render() {
    return (
      <div>
        {
            this.props.userlist&&this.props.userlist.map(v=>{
              return (
                v.avatar?
                <div onClick={()=>{
                    this.props.history.push(`/chat/${v._id}`)
                    this.props.change_path(`/chat/${v._id}`)
                    storage.set('__path__',`/chat/${v._id}`) 
                    //console.log(this.props.history)
                }} key={v._id}>
                    <WhiteSpace/>
                    <Card>
                    <Card.Header
                        title={v.user}
                        thumb={'/'+require('@common/images/'+v.avatar+'.png')}
                        extra={<span>{v.title}</span>}
                    />
                    <Card.Body>
                        {
                            v.type==='boss'?<div className="company">公司:{v.company}</div>:null
                        }
                        <div className="desc">{v.desc.split('\n').map((v,i)=>(<div key={i}>{v}</div>))}</div>
                        {
                            v.type==='boss'?<div className="money">薪资:{v.money}</div>:null
                        }
                    </Card.Body>
                    
                    </Card>
                </div>
                :null
              )
            })
          }
      </div>
    )
  }
}
UserCard.propTypes={
    userlist:PropTypes.array.isRequired
}
export default connect(
    state=>state.userReducer,
    (dispatch)=>bindActionCreators(userAction,dispatch)
)(withRouter(UserCard))
