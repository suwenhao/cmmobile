import React, { Component } from 'react'
import {Grid,Flex} from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends Component {
  constructor(props){
    super(props);
    this.state={
      icon:'',
      text:''
    }
  }
  render() {
    const avatarList='boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'.split(',').map(item=>({icon:'/'+require('@common/images/'+item+'.png'),text:item}))
    const header = this.state.text
                    ?
                    <div className="avatar-select">
                      <span>已选择头像</span>
                      <Flex className="avatar-flex">
                        <Flex.Item></Flex.Item>
                        <Flex.Item>
                          <img className="avatar" src={this.state.icon}/>
                        </Flex.Item>
                        <Flex.Item></Flex.Item>
                      </Flex>
                    </div>
                    :
                    <div className="avatar-select">
                    <span>请选择头像</span>
                    </div>
                    
    return (
      <div className="avatar-box">
        {header}
        <Grid 
          data={avatarList} 
          columnNum={5}
          onClick={e=>{
            this.setState(e)
            this.props.selectAvatar(e.text)
          }}
        />
      </div>
    )
  }
}
AvatarSelector.propTypes = {
  selectAvatar:PropTypes.func.isRequired
}
export default AvatarSelector
