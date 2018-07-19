import React, { Component } from 'react'
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'
import '@common/styles/msg.scss'
import {withRouter} from 'react-router-dom'
import storage from 'good-storage'

const Item = List.Item;
const Brief = Item.Brief;

class Msg extends Component {
  //获取数组最后一位
  getLast(arr){
    return arr[arr.length-1]
  }
  render() {
    //判断是否有聊天信息
    if(!this.props.chat.chatmsg.length){
      return null;
    }
    let msgGroup={}
    //当前用户id
    let userid = this.props.user._id;
    //所有聊天记录遍历合并用户
    this.props.chat.chatmsg.forEach(v=>{
      msgGroup[v.chatid]=msgGroup[v.chatid]||[]
      msgGroup[v.chatid].push(v)
    })
    //合并的用户按时间排序
    let chatList = Object.values(msgGroup).sort((a,b)=>{
      const a_last=this.getLast(a)
      const b_last=this.getLast(b)
      return b_last.createtime-a_last.createtime
    })
    return (
      <div>
        {
            chatList.map((v,i)=>{
              //遍历有消息的用户
              let lastItem=this.getLast(v)
              //拿到当前聊天的用户不是当前用户
              //from等于当前用户时返回to，不等于当前用户时返回from
              let targetId = lastItem.from===userid?lastItem.to:lastItem.from
              //拿到消息数read为false并且to是当前用户时
              let unreadNum = v.filter(v=>!v.read&&v.to===userid).length;
              //当前聊天的用户的信息
              let user = this.props.chat.users[targetId]
              return (
                <List key={i}>
                  <Item
                    arrow="horizontal"
                    extra={<Badge text={unreadNum}></Badge>}
                    thumb={'/'+require('@common/images/'+user.avatar+'.png')}
                    onClick={()=>{
                      this.props.history.push(`/chat/${targetId}`)
                      storage.set('__path__',`/chat/${targetId}`)
                    }}
                  >
                    {lastItem.content}
                    <Brief>{user.name}</Brief>
                  </Item>
                </List>
              )
            })
          }
      </div>
    )
  }
}
export default connect(
  state=>({chat:state.chatReducer,user:state.userReducer})
)(withRouter(Msg))
