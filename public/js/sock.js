var socket = io.connect();//与服务器进行连接
window.onbeforeunload = function (event) {
    alert("要断开连接");
    socket.emit('discon', 'aaa');
};
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
        // var $btn = $(this);
        // $btn.button('匹配中');
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
        $('#match').text('匹配成功');
        $('#match').addClass('am-disabled');
        $('.mask').addClass('hide');
        console.log("匹配成功");
        $('.infobar p').text('正在与{'+data+'}共同游戏');
    });
    socket.on('noplayer', function (data) {
        $('#match').text('匹配失败');
        $('#match').addClass('am-disabled');
        console.log("匹配失败，无空闲玩家");
        setTimeout(function () {
            $('#match').text('重新匹配');
            $('#match').removeClass('am-disabled');
        },2000)
    });
    socket.on('loginsuccess', function (data) {
        console.log("登录成功,id为：",data);
    });
    socket.on("gamereq",function () {

    });
    socket.on("discon",function () { //队友跑了
        alert("你的队友跑路了");
    })
});
