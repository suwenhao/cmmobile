const express = require('express');
const Router = express.Router();
const utils = require('utility');//md5加密
const User = require('../models/User.js')
const Chat = require('../models/Chat.js')

//获取用户信息
Router.post('/info',(req,res)=>{
    const {userid} = req.cookies;
    if(!userid){
        return res.json({code:1,msg:'用户没有登录'})
    }
    User.findOne({_id:userid},{pwd:0},(err,doc)=>{
        if(err){
            return res.json({code:3,msg:'后端出错了'})
        }
        if(doc){
            return res.json({code:0,msg:'已登录',data:doc})
        }else{
            return res.json({code:2,msg:'没有这个用户'})
        }
    })
})
//注册
Router.post('/register',async (req,res)=>{
    console.log(req.body);
    let {user,pwd,type} = req.body;
    let doc=await User.findOne({user});
    if(doc){
        return res.json({code:1,msg:'用户名重复'})
    }
    User.create({user,pwd:md5Pwd(pwd),type},(e,d)=>{
        if(e){
            return res.json({code:3,msg:'后端出错了'})
        }
        //console.log(d);
        res.cookie('userid',d._id)
        return res.json({code:0,msg:'注册成功',data:{_id:d._id,user:d.user,type:d.type}})
    })
})
//提交资料
Router.post('/update',async (req,res)=>{
    const {userid} = req.cookies;
    if(!userid){
        return res.json({code:1,msg:'用户没有登录'})
    }
    const body = req.body;
    User.findByIdAndUpdate(userid,body,(err,doc)=>{
        if(doc===null){
            return res.json({code:1,msg:'用户不存在'})
        }else{
            const data = Object.assign({},{
                user:doc.user,
                type:doc.type,
                _id:doc._id
            },body)
            res.json({code:0,msg:'更新资料成功',data})
        }
    })
})
//登录
Router.post('/login',async (req,res)=>{
    console.log(req.body);
    let {user,pwd} = req.body;
    let doc=await User.findOne({user});
    if(doc===null){
        return res.json({code:1,msg:'用户不存在'})
    }else{
        if(doc.pwd!==md5Pwd(pwd)){
            return res.json({code:2,msg:'输入密码错误'})
        }else{
            let obj={
                user:doc.user,
                _id:doc._id,
                type:doc.type,
                avatar:doc.avatar,
                desc:doc.desc||null,
                title:doc.title||null,
                company:doc.company||null,
                money:doc.money||null
            }
            res.cookie('userid',doc._id)
            return res.json({code:0,msg:'登录成功',data:obj});
        }
    }
})
//获取用户列表
Router.post('/list',(req,res)=>{
    const {type} = req.body;
    if(!type){
        return res.json({code:1,msg:'缺少参数'})
    }
    User.find({type},{pwd:0},(err,doc)=>{
        if(err){
            return res.json({code:3,msg:'后端出错了'})
        }
        if(doc){
            return res.json({code:0,msg:'成功获取数据',data:doc})
        }else{
            return res.json({code:2,msg:'没有这个用户'})
        }
    })
})
Router.post('/getmsglist',async (req,res)=>{
    const {userid} = req.cookies;
    if(!userid){
        return res.json({code:1,msg:'用户没有登录'})
    }
    let userlist=await User.find({});
    let users={}
    userlist.forEach(v=>{
        users[v._id] = {name:v.user,avatar:v.avatar}
    })
    Chat.find({'$or':[{from:userid},{to:userid}]}).sort({createtime:1}).exec(function(err,doc){
        if(err){
            return res.json({code:3,msg:'后端出错了'})
        }
        return res.json({code:0,msg:'成功获取数据',data:doc,users:users})
    })
})
Router.post('/readmsg',(req,res)=>{
    const {userid} = req.cookies;
    if(!userid){
        return res.json({code:1,msg:'用户没有登录'})
    }
    let {from} = req.body
    Chat.update(
        {from,to:userid},
        {'$set':{read:true}},
        {'multi':true}
    ).exec((err,doc)=>{
        if(err){
            return res.json({code:3,msg:'后端出错了'})
        }
        console.log(doc)
        return res.json({code:0,msg:'修改成功',num:doc.nModified})
    })
})
function md5Pwd(pwd){
    const salt = 'cmmobile_web19941003!@#SUWenHao~~';
    return utils.md5(utils.md5(pwd+salt))
}
module.exports=Router;