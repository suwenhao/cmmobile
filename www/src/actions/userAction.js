import {ERROR_MSG,AUTH_SUCCESS,LOGOUT,CHANGEPATH} from '@type/userType.js'
import axios from 'axios'
//注册或登录成功跳转函数
import {getRedirectPath} from '@common/js/util.js' 
import storage from 'good-storage'

//注册
export const register = ({user,pwd,repeatwd,type}) => async (dispatch)=>{
    //用户输入不能为空
    if(!user||!pwd||!type){
        dispatch({type:ERROR_MSG,msg:'用户名密码必须输入'})
        return;
    }
    //密码和确认密码不相等
    if(pwd!==repeatwd){
        dispatch({type:ERROR_MSG,msg:'密码和确认密码不相等'})
        return;
    }
    //发送请求
    var {data,status} =await axios.post('/user/register',{user,pwd,repeatwd,type}).then(res=>res);
    //返回结果
    if(status===200&&data.code===0){
        dispatch({type1:type,data:data.data,type:AUTH_SUCCESS})
        storage.set('__path__',getRedirectPath({type:type,avatar:data.data.avatar||null})) 
    }else{
        dispatch({type:ERROR_MSG,msg:data.msg})
    }   
}
//登录
export const login = ({user,pwd}) => async (dispatch)=>{
    if(!user||!pwd){
        dispatch({type:ERROR_MSG,msg:'用户名密码必须输入'})
        return;
    }
    //发送请求
    var {data,status} =await axios.post('/user/login',{user,pwd}).then(res=>res);
    //返回结果
    if(status===200&&data.code===0){
        dispatch({type1:data.data.type,data:data.data,type:AUTH_SUCCESS})
        storage.set('__path__',getRedirectPath({type:data.data.type,avatar:data.data.avatar||null})) 
    }else{
        dispatch({type:ERROR_MSG,msg:data.msg})
    }   
}
//设置用户登录数据
export const load_data = (data)=>{
    return {type1:data.type,data,type:AUTH_SUCCESS}
}
//提交资料
export const update = (obj)=> async (dispatch)=>{
    let {data,status} =await axios.post('/user/update',obj).then(res=>res);
    //返回结果
    if(status===200&&data.code===0){
        dispatch({type1:data.data.type,data:data.data,type:AUTH_SUCCESS})
    }else{
        dispatch({type:ERROR_MSG,msg:data.msg})
    } 
}
//退出登录
export const logout_submit = ()=>{
    return {type:LOGOUT}
}
export const change_path = (path) => {
    return {type:CHANGEPATH,path}
}