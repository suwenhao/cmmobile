var mongoose = require('mongoose')
var db = require('./db.js')
var schema = new mongoose.Schema({
    id:{type:Number},
    user:{type:String},
    pwd:{type:String},
    type:{type:String},
    //头像
    avatar:{type:String},
    //简介
    desc:{type:String},
    //职位名
    title:{type:String},
    //如果是boss 还有两个字段
    company:{type:String},
    money:{type:String}
})

var User = mongoose.model('User', schema);

module.exports=User;