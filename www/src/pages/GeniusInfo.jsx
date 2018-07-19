import React, { Component } from 'react'
import {NavBar,List,InputItem,TextareaItem,Button,WhiteSpace,WingBlank} from 'antd-mobile'
import AvatarSelector from '@components/AvatarSelector/AvatarSelector'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import * as userAction from '@actions/userAction.js'
//

//css
import '@common/styles/info.scss'

class GeniusInfo extends Component {
  constructor(props){
    super(props)
    this.state={
        title:'',
        desc:'',
        avatar:''
    }
  }
  //受控组件表单
  handleChange(key,val){
    this.setState({
        [key]:val
    })
  }
  //选择头像
  selectAvatar(text){
      this.setState({
          'avatar':text
      })
  }
  render() {
    const path = this.props.location.pathname;
    return (
      <div className="info-page">
        {this.props.redirectTo!==path&&this.props.redirectTo?<Redirect to={this.props.redirectTo}></Redirect>:null}
        <NavBar mode="dark">求职完善信息</NavBar>
        <AvatarSelector selectAvatar={this.selectAvatar.bind(this)}></AvatarSelector>
        <div className="info-containter">
            <List>
                <InputItem
                    clear
                    placeholder="输入求职岗位"
                    value={this.state.title} 
                    onChange={v=>this.handleChange('title',v)}>
                    求职岗位
                </InputItem>
                <TextareaItem
                    clear
                    title="个人简介"
                    placeholder="输入个人简介"
                    rows="3"
                    autoHeight
                    value={this.state.desc} 
                    onChange={v=>this.handleChange('desc',v)}
                />
                <WhiteSpace/>
                <WingBlank>
                    <Button onClick={()=>{
                        this.props.update(this.state);
                    }} type="primary">确认</Button>
                    <WhiteSpace/>
                </WingBlank>
            </List>
        </div>
      </div>
    )
  }
}
export default connect(
    state=>state.userReducer,
    (dispatch)=>bindActionCreators(userAction,dispatch)
)(GeniusInfo)
