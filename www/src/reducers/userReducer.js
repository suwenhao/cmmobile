//type
import {AUTH_SUCCESS,ERROR_MSG,LOGOUT,CHANGEPATH} from '@type/userType.js'
//注册或登录成功跳转函数
import {getRedirectPath} from '@common/js/util.js' 

var initState={
    redirectTo:'',//根据登录成功跳转地址
    msg:'',//消息
    user:'',//用户
    type:''//用户类型
};
//reducer函数
export default (state=initState,action)=>{
    switch(action.type){
        //注册成功
        case AUTH_SUCCESS:
            return {
                ...state,
                msg:'',
                redirectTo:getRedirectPath({type:action.type1,avatar:action.data.avatar||null}),
                ...action.data,
                type:action.type1
            }
            break;
        //失败提示
        case ERROR_MSG:
            return {
                ...state,
                msg:action.msg
            }
            break;
        case CHANGEPATH:
            return {
                ...state,
                redirectTo:action.path
            }
            break;
        case LOGOUT:
            return {
                ...initState,
                redirectTo:'/login'
            }
            break;
        default:
            return state;
    }
}