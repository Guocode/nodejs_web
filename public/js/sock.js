// window.onbeforeunload=function(e){
//     var e = window.event||e;
//     e.returnValue=("确定离开当前页面吗？");
//     socket.emit('discon', 'aaa');
//     io.disconnect();
// }
$(document).ready(function () {
    var socket = io.connect();//与服务器进行连接
    console.log("向服务器发送连接请求");
    socket.on('loginsuccess', function (data) {
        document.title = data.toString().slice(0,5);
        console.log("登录成功,id为：",data);
    });


    $('#match').on('click', function () {
        socket.emit('match', null);
    });
    $('#sendmsg').on('click', function () {
        console.log('发送消息');
        socket.emit('send', document.getElementById('msginput').value);
    });
    $('#discon').on('click', function () {
        console.log('断开连接');
        socket.emit('discon', '断开连接');
    });
    socket.on('recmsg',function (data) {
        console.log(data);
    });
    socket.on('matchsuccess', function (data) {
        $('#match').text('Matched');
        $('#match').addClass('am-disabled');
        $('#sendmsg').removeClass('am-disabled');
        $('.mask').addClass('hide');
        console.log("匹配成功");
        $('.infobar p').text('Playing with: '+data.toString().slice(0,5));
    });
    socket.on('noplayer', function (data) {
        $('#match').text('No-matched');
        $('#match').addClass('am-disabled');
        console.log("匹配失败，无空闲玩家");
        setTimeout(function () {
            $('#match').text('Rematch');
            $('#match').removeClass('am-disabled');
        },2000)
    });
    socket.on("gamereq",function () {

    });
    socket.on("partnerdisc",function () { //队友跑了
        alert("你的队友跑路了");
        $('#match').text('Rematch');
        $('#match').removeClass('am-disabled');
        $('.infobar p').text('');
        $('.mask').removeClass('hide');
    });
    socket.on("user left",function (data) { //队友跑了
        console.log(data.username+"跑了！");
    })
});