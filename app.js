const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const history = require('connect-history-api-fallback');
const compression = require('compression');
const fs = require('fs');
const url = require("url");
const app=express();
const Chat = require('./models/Chat.js')

const server = require('http').createServer(app)
const io = require('socket.io').listen(server)

io.on('connection',function(socket){
    console.log('user login')
    socket.on('sendmsg',function(data){
        const {from,to,msg} = data;
        const chatid = [from,to].sort().join('_');
        Chat.create({chatid:chatid,content:msg,from,to,createtime:new Date().getTime()},function(err,d){
            console.log(data)
            io.emit('recvmsg',Object.assign({},d._doc));
        })
    })
})

//指向index.html
app.use(history());
//gzip
app.use(compression());
//cookie
app.use(cookieParser());
app.use(bodyParser.json());
//路由
var userRouter = require('./routes/user')

app.use('/user',userRouter)

app.use(express.static('./www/dist'));

server.listen(8080,function(err){
    console.log('http://localhost:8080');
})