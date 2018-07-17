// window.onbeforeunload=function(e){
//     var e = window.event||e;
//     e.returnValue=("确定离开当前页面吗？");
//     socket.emit('discon', 'aaa');
//     io.disconnect();
// }
var socket = io.connect();//与服务器进行连接
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}
// $(document).ready(function () {
console.log("向服务器发送连接请求");
socket.on('loginsuccess', function (data) {
    // document.title = data.toString().slice(0,5);
    console.log("登录成功,id为：",data);
});

socket.on('recmsg',function (data) {
    console.log(data);
    $('.right').append('<ul class="am-comment am-comment-primary"><a href="#link-to-user-home"><img src="http://www.gravatar.com/avatar/1ecedeede84abbf371b9d8d656bb4265?d=mm&amp;s=96" alt="" class="am-comment-avatar" width="48" height="48"></a><div class="am-comment-main"><header class="am-comment-hd"><div class="am-comment-meta"><a href="#link-to-user" class="am-comment-author">another handsome man</a> commented@ <time datetime="2013-07-27T04:54:29-07:00" title="2013年7月27日 下午7:54 格林尼治标准时间+0800">'+getNowFormatDate()+'</time></div></header><div class="am-comment-bd"><p>'+data+'</p></div></div></ul>')
});

socket.on('noplayer', function (data) {
    $('#match').text('Unmatched');
    $('#match').addClass('am-disabled');
    console.log("匹配失败，无空闲玩家");
    setTimeout(function () {
        $('#match').text('Rematch');
        $('#match').button('reset');
        $('#match').removeClass('am-disabled');
    },2000)
});
socket.on("partnerdisc",function () { //队友跑了
    alert("Your partner ran away!");
    $('#match').text('Rematch');
    $('#match').removeClass('am-disabled');
    $('.infobar p').text('');
    $('.mask').removeClass('hide');
    $('#sendmsg').addClass('am-disabled');
});
socket.on("user left",function (data) { //队友跑了
    console.log(data.username+"跑了！");
});
socket.on("nouser",function (data) { //队友跑了
    alert("Please login!");
});
// });