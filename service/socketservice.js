function createsocket(server,socketpool,socketpool2) {
    var io = require('socket.io').listen(server);
    io.on('connection', function(socket) {
        //接收并处理客户端发送的foo事件
        socketpool2.free.put(socket.id,socket);
        console.log("2池长度"+(socketpool2.free.size()+socketpool2.busy.size()));
        console.log("2池free长度"+socketpool2.free.size());
        console.log("2池busy长度"+socketpool2.busy.size());
        socket.partner=null;
        socket.emit('loginsuccess',socket.id);
        console.log(socket.id);
        socket.on('con', function() {
            //将消息输出到控制台
            console.log("建立连接");
        });
        socket.on('match', function() {
            if (socketpool2.free.size()<=1){
                console.log("没有空闲玩家");
                socket.emit('noplayer');
            } else {
                socketpool2.free.remove(socket.id);
                var ptn = socketpool2.free.pop();
                ptn.partner = socket;
                socket.partner = ptn;
                socketpool2.busy.put(ptn.id,ptn);
                socketpool2.busy.put(socket.id,socket);
                socket.emit('matchsuccess',ptn.id);
                ptn.emit('matchsuccess',socket.id);
            }
            console.log("2池长度"+(socketpool2.free.size()+socketpool2.busy.size()));
            console.log("2池free长度"+socketpool2.free.size());
            console.log("2池busy长度"+socketpool2.busy.size());
        });
        socket.on('send', function(data) {
            //将消息输出到控制台
            socket.partner.emit('recmsg',data);
            console.log(data);
        });
        socket.on('disconnect', () => {
            if(socket.partner!=null){//若有队友 给队友发一个断开信号 自己从busy中移除
                console.log("这家伙有队友的！！！！")
                var ptn = socket.partner;
                ptn.partner=null;
                socketpool2.busy.remove(ptn.id);
                socketpool2.free.put(ptn.id,ptn);
                ptn.emit('partnerdisc');
                //队友回到free池
                socketpool2.busy.remove(socket.id);
            }else{//没有队友 直接把自己从free中移除
                console.log("这家伙没有队友！！！！")
                socketpool2.free.remove(socket.id);
            }
            console.log("2池长度"+(socketpool2.free.size()+socketpool2.busy.size()));
            console.log("2池free长度"+socketpool2.free.size());
            console.log("2池busy长度"+socketpool2.busy.size());
            console.log("==================");
            socket.broadcast.emit('user left', {
                username: socket.id
            });
        });
    });
    return io;
}
module.exports =createsocket;