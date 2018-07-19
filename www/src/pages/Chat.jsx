import React, { Component } from 'react'
import io from 'socket.io-client'
import { NavBar, Icon, Grid, Toast } from 'antd-mobile';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as chatAction from '@actions/chatAction.js'
import sd from 'silly-datetime'
import classnames from 'classnames'
import $ from 'jquery'
import storage from 'good-storage'
import {getChatId,emojiStr} from '@common/js/util.js'


import '@common/styles/chat.scss'

class Chat extends Component {
  constructor(props){
    super(props);
    this.state={
      text:'',
      msg:[],
      last:null,
      showemoji:false
    }
  }
  componentDidMount(){
    if(this.props.chat.chatmsg.length<1){
      this.props.getMsgList(()=>{
        this.scrollToEnd()
      })
    }
    this.props.recvMsg(()=>{
      this.scrollToEnd()
    })
    this.scrollToEnd()
    this.fixCarousel()
  }
  componentWillUnmount(){
    let to = this.props.match.params.user;
    this.props.readMsg({from:to})
  }
  //处理表情bug
  fixCarousel(){
    setTimeout(()=>{
      window.dispatchEvent(new Event('resize'))
    },0)
  }
  handleSubmit(){
    if(this.state.text===''){
      Toast.info('请输入内容', 1);
      return;
    }
    let from = this.props.user._id;
    let to = this.props.match.params.user;
    let msg = this.state.text;
    this.props.setMsg({from,to,msg})
    this.scrollToEnd()
    this.setState({
      text:'',
      showemoji:false
    })
  }
  //滚动到底部
  scrollToEnd(){
    $(this.refs.chatbody).scrollTop($(this.refs.chatcontent).height());
  }
  render() {
    //拿到表情
    let emoji=emojiStr;
    //把表情字符串转换为数组
    let emojiarr=emoji.split(' ').filter(v=>v).map(v=>({text:v}))
    //拿到当前聊天的用户的id
    let userid = this.props.match.params.user;
    //所有用户
    let users = this.props.chat.users;
    //当前用户的id
    let fromid = this.props.user._id;
    //chatid
    let chatid=getChatId(userid,fromid)
    //当前聊天的用户的name
    let headTitle=JSON.stringify(users)!=='{}'&&users[userid].name;
    //所有聊天数据遍历返回当前用户和当前聊天用户chatid相同的数据
    let chatmsgs=this.props.chat.chatmsg.filter(v=>{
      return v.chatid===chatid
    })
    //没有这个聊天用户时返回空
    if(!users[userid]){
      return null
    }
    return (
      <div className="chat-page">
        <div className="chat-head">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() =>{
            this.props.history.push('/msg')
            storage.set('__path__','/msg')
            // this.props.history.goBack()
          }}
        >{headTitle}</NavBar>
        </div>
        <div className="chat-body" ref="chatbody">
        <div className="chat-content" ref="chatcontent">
            {
              chatmsgs.map((v,i)=>{
                return (
                    <div key={i} className={classnames({
                    'chat-item':true,
                    'item-right':v.from!==userid?true:false
                })}>
                      <div className="item-time"><span>{sd.format(new Date(v.createtime))}</span></div>
                      <div className="item-head">
                        <img src={'/'+require('@common/images/'+users[v.from].avatar+'.png')}/>
                        <span>{users[v.from].name}</span>
                      </div>
                      <div  className="item-body">
                        <div>
                          <i></i>
                        </div>
                        <span>
                          {v.content}
                        </span>
                      </div>
                    </div>
                  )
              })
            }
          </div>
        </div>
        <div className="chat-footer">
          <div className="chat-footer-l">
            <input 
              type="text" 
              placeholder="请输入"
              value={this.state.text}
              onChange={(e)=>{
                this.setState({text:e.target.value})
              }}
            />
          </div>
          <div className="chat-footer-r">
            <button className="emojibtn" onClick={()=>{
              this.setState({showemoji:!this.state.showemoji})
              this.fixCarousel()
            }}>😀</button>
            <button onClick={()=>{
              this.handleSubmit()
            }}>发送</button>
          </div>
        </div>
        {
          this.state.showemoji
          ?
          <div className="emoji">
            <Grid onClick={(el,num)=>{
              this.setState({
                text:this.state.text+el.text
              })
            }} activeStyle={false} data={emojiarr} isCarousel columnNum={9} carouselMaxRow={5} />
          </div>
          :null
        }
        
      </div>
    )
  }
}
export default connect(
  state=>{
    return {
      user:state.userReducer,
      chat:state.chatReducer
    }
  },
  (dispatch)=>bindActionCreators(chatAction,dispatch)
)(Chat)
