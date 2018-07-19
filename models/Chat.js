var mongoose = require('mongoose')
var db = require('./db.js')

var schema = new mongoose.Schema({
    chatid:{type:String},
    from:{type:String},
    to:{type:String},
    read:{type:Boolean,default:false},
    content:{type:String,default:''},
    createtime:{type:Number,default:new Date().getTime()}
})

var Chat = mongoose.model('Chat', schema);

module.exports=Chat;