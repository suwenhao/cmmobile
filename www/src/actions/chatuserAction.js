import {USER_LIST} from '@type/chatuserType.js'
import {ERROR_MSG} from '@type/userType.js'
import axios from 'axios'

export const get_userlist = (type) => async (dispatch) => {
    let {data,status}=await axios.post('/user/list',{type}).then(res=>res);
    //返回结果
    if(status===200&&data.code===0){
        dispatch({userlist:data.data,type:USER_LIST})
    }else{
        dispatch({type:ERROR_MSG,msg:data.msg})
    } 
}