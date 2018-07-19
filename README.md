# car二手汽车内部后台系统

#### 项目介绍
一个后台的方便客服人员查看二手车的信息的系统
# 注意：请认真看使用说明

#### 项目预览

<img src="./doc/view/0.png" width="48%">
<img src="./doc/view/1.png" width="48%">
<img src="./doc/view/1.1.png" width="48%">
<img src="./doc/view/1.2.png" width="48%">
<img src="./doc/view/2.png" width="48%">
<img src="./doc/view/3.png" width="48%">
<img src="./doc/view/4.png" width="48%">
<img src="./doc/view/5.png" width="48%">
<img src="./doc/view/6.png" width="48%">
<img src="./doc/view/7.png" width="48%">
<img src="./doc/view/8.png" width="96%">

#### 软件架构
软件架构说明

- 后端
    - nodejs
- 前端
    - react、react-router、react-redux、redux、es6、es7、mockjs、antd UI框架、jQuery
- 数据库
    - mongodb
- 服务器
    - nodejs-express

#### 安装教程

1. 安装了node，建议node版本大于v6.x
2. 导入数据库
    - 安装mongodb 
    - 开启mongodb
    - 数据文件夹在doc文件夹内
    - mongodb导入：mongorestore -h dbhost -d dbname path 
    - dbhost是mongodb的IP，dbname是数据库的名字，path是doc里的数据库文件夹
    - 如下：
    - mongorestore -h 127.0.0.1 -d carsystem ./carsystem
3. npm install 或者 yarn install
4. 确认数据库已经开启，然后在根文件夹node app.js就可以了
5. 打开网页 http://localhost:8080/

#### 使用说明

1. 目录
```
├─doc               相关文件
│  ├─carsystem      数据库文件夹
│  └─view
├─models            mongoose模型
├─node_modules   
├─static            图片等静态资源
├─www               react前端相关目录
│  ├─dist           编译后放后端的前端
│  └─src            react前端源码
```
3. 开发时请输入npm start开启webpack自动编译dist
4. 开启node服务器 npm server，请确保mongodb已经开启，并且导入了数据
5. 测试修改

