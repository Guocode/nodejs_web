var express = require('express');

var router = express.Router();

//引入mysql模块

//引入文件

let db = require('../DAO/mysql_config');

//进行查询
router.get('/' , function(req,res,next){

    res.send('hello');

})
router.get('/query' , function(req,res,next){
    connection.connect();
    console.log("连接建立");
    var  sql = 'SELECT * FROM users';
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        console.log('--------------------------SELECT----------------------------');
        console.log(result);
        res.send(result);
        console.log('------------------------------------------------------------\n\n');
    });

})
router.get('/insert' , function(req,res,next){
    let sqlpara = ['newuser',null,null,null,null];
    let sqlString = 'INSERT INTO users(userid,username,password,email,telephone,signuptime) VALUES(0,?,?,?,?,?)';
    let connection = db.connection();
    db.insert(connection, sqlString, sqlpara, function(id){
        console.log('inserted id is:' + id);
    });
    db.close(connection);
    res.send('注册成功');
})

module.exports = router;