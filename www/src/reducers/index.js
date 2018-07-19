import {combineReducers} from 'redux'

import userReducer from './userReducer.js'
import chatuserReducer from './chatuserReducer.js'
import chatReducer from './chatReducer.js'

export default combineReducers({
    userReducer,
    chatuserReducer,
    chatReducer
})