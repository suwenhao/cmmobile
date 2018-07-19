import {MSG_LIST,MSG_RECV,MSG_READ} from '@type/chatType.js'
import _ from 'underscore'

const initState={
    chatmsg:[],
    users:{},
    unread:0
}

export default (state=initState,action)=>{
    switch(action.type){
        case MSG_LIST:
            return {
                ...state,
                chatmsg:action.msgs,
                users:action.users,
                unread:action.msgs.filter(v=>!v.read&&v.to===action.userid).length
            }
            break;
        case MSG_RECV:
            let chatmsg=[
                ...state.chatmsg,
                action.data
            ]
            chatmsg=_.uniq(chatmsg,'_id');
            let tf=false;
            state.chatmsg.forEach(v=>{
                if(v._id===action.data._id){
                    tf=true
                }
            })
            return {
                ...state,
                chatmsg,
                unread:action.data.to===action.userid&&tf===false?state.unread+1:state.unread
            }
            break;
        case MSG_READ:
            return {
                ...state,
                chatmsg:state.chatmsg.map(v=>{
                    return {...v,read:true}
                }),
                unread:state.unread-action.num
            }
            break;
        default:
            return state;
    }
}