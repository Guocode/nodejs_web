var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('/home');
});
router.get('/home', function(req, res, next) {
    if(!req.session.user) {                //到达/home路径首先判断是否已经登录
        console.log("未登录");
        res.render("index", {title: '未登录',userlogin:false});         //已登录则渲染home
    }else{
        console.log("已登录");
        res.render("index",{title:'你好！'+req.session.user.username,userlogin:true});         //已登录则渲染home页面
    }

});
router.get('/meetall', function(req, res, next) {
    if(!req.session.user) {                //到达/home路径首先判断是否已经登录
        console.log("未登录");
        res.render("meetall", {title: '未登录',userlogin:false});         //已登录则渲染home
    }else{
        console.log("已登录");
        res.render("meetall",{title:'你好！'+req.session.user.username,userlogin:true});         //已登录则渲染home页面
    }
});
router.get('/about', function(req, res, next) {
    if(!req.session.user) {                //到达/home路径首先判断是否已经登录
        console.log("未登录");
        res.render("about", {title: '未登录',userlogin:false});         //已登录则渲染home
    }else{
        console.log("已登录");
        res.render("about",{title:'你好！'+req.session.user.username,userlogin:true});         //已登录则渲染home页面
    }
});
module.exports = router;