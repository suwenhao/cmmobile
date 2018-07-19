import 'babel-polyfill';
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {createStore,applyMiddleware,compose} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import reducer from './reducers'

import App from './App'

import '@common/js/config.js'

try {
    var devTools=window.devToolsExtension?window.devToolsExtension():null
    var store = createStore(reducer,compose(
        applyMiddleware(thunk,logger),
        devTools
    ))
} catch (error) {
    console.log('浏览器没安装Redux DevTools插件,现在没有Redux DevTools调试功能')
    var store = createStore(reducer,compose(
        applyMiddleware(thunk,logger),
    ))
}


ReactDOM.render(
    <Provider store={store}>
        <App></App>
    </Provider>
    ,
    document.getElementById('root')
)