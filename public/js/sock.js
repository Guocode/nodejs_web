var socket = io.connect();//与服务器进行连接
$(document).ready(function () {
    console.log("向服务器发送连接请求");
    $('#con').on('click',function () {
        if(true){
            var socket = io.connect();
        }
        else {
            alert("已连接！");
        }
    });
    $('#match').on('click', function () {
        var $btn = $(this);
        $btn.button('loading');
        setTimeout(function(){
            $btn.button('reset');
        }, 5000);
        $('.infobar p').addClass('active');
        socket.emit('match', null);
    });
    $('#send').on('click', function () {
        console.log('发送消息');
        socket.emit('send', document.getElementById('input').value);
    });
    $('#discon').on('click', function () {
        console.log('断开连接');
        socket.emit('discon', '断开连接');
    });
    socket.on('recmsg',function (data) {
        console.log(data);
    });
    socket.on('matchsuccess', function (data) {
        console.log(data);
    });
    socket.on('loginsuccess', function (data) {
        console.log("登录成功,id为：",data);
    });
});
window.onbeforeunload = function (event) {
    socket.emit('discon', "断开连接");
};