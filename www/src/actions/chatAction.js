import axios from 'axios'
import {MSG_LIST,MSG_RECV,MSG_READ} from '@type/chatType.js'
import {ERROR_MSG} from '@type/userType.js'
import io from 'socket.io-client';
import {baseUrl} from '@common/js/util.js'
const socket = io(`ws://${baseUrl}`)

export const getMsgList = (callback) => async (dispatch,getState) => {
    let {data,status} = await axios.post('/user/getmsglist').then(res=>res);
    //console.log(data.users)
    if(status===200&&data.code === 0){
        const userid = getState().userReducer._id
        dispatch({msgs:data.data,userid,users:data.users,type:MSG_LIST})
        callback&&callback()
    }else{
        dispatch({type:ERROR_MSG,msg:data.msg})
    }
}
export const setMsg = ({from,to,msg}) => async (dispatch) => {
    socket.emit('sendmsg',{from,to,msg})
}
export const recvMsg = (callback) => function(dispatch, getState){
    socket.on('recvmsg',function(data){
        const userid = getState().userReducer._id;
        dispatch({data,userid,type:MSG_RECV})
        callback&&callback()
        return;
    })
}
export const readMsg = ({from}) => async (dispatch, getState) => {
    let {data,status} = await axios.post('/user/readmsg',{from}).then(res=>res)
    let userid = getState().userReducer._id;
    if(status===200&&data.code===0){
        dispatch({from,userid,num:data.num,type:MSG_READ})
    }else{
        dispatch({type:ERROR_MSG,msg:data.msg})
    }   
}