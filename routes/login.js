var express = require('express');
var router = express.Router();
let db = require('../DAO/mysql_config');
/* GET login page. */
router.get('/', function(req, res, next) {
    console.log(req,res,next);
    res.render('login', { title: 'login' });
});
router.post('/signin', function(req, res, next) {
    // 输出 JSON 格式
    var response = {
        "username":req.body.username,
        "password":req.body.password
    };
    req.session.user = req.body;
    //res.send(200);
    res.redirect("/");
    console.log(response);
});
router.post('/signup', function(req, res, next) {
    // 输出 JSON 格式
    var response = {
        "username":req.body.username,
        "email":req.body.email,
        "password1":req.body.password1,
        "password2":req.body.password2
    };
    if (response.password1!=response.password2){
        res.render('error',{errorinfo:'密码不一致'});
    }else {
        let sqlpara = [response.username,response.password1,response.email,null,null];
        let sqlString = 'INSERT INTO users(userid,username,password,email,telephone,signuptime) VALUES(0,?,?,?,?,?)';
        let connection = db.connection();
        db.insert(connection, sqlString, sqlpara, function(id){
            console.log('inserted id is:' + id);
        });
        db.close(connection);
        res.render('error',{errorinfo:'注册成功'});
    }
    console.log(response);

});
router.get("/logout",function(req,res){    // 到达 /logout 路径则登出， session中user,error对象置空，并重定向到根路径
    console.log("用户注销");
    req.session.user = null;
    req.session.error = null;
    res.redirect("/home");
});
module.exports = router;