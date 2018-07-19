import {USER_LIST} from '@type/chatuserType.js'

const initState = {
    userlist : []
}
export default (state=initState,action)=>{
    switch(action.type){
        case USER_LIST:
            return {
                ...state,
                userlist:action.userlist
            }
            break;
        default:
            return state;
    }
}