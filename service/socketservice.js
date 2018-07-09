function createsocket(server,socketpool) {
    var io = require('socket.io').listen(server);
    io.on('connection', function(socket) {
        //接收并处理客户端发送的foo事件
        socketpool.frees=socket;
        socket.emit('loginsuccess',socket.id);
        console.log(socket.id);
        socket.on('con', function() {
            //将消息输出到控制台
            console.log("建立连接");
        });
        socket.on('match', function() {
            console.log("请求id:"+socket.id);
            console.log("当前空闲玩家数:"+socketpool.free.length);
            console.log("当前游戏中的玩家数:"+socketpool.busy.length);
            console.log("======================================");
            //将消息输出到控制台
            if(socketpool.free.length<=1){
                console.log("没有空闲玩家");
                this.emit('noplayer');
            }else {
                socketpool.findpartner(socket,function (data) {
                    socket.partner = data;
                    data.partner = socket;
                    socket.emit('matchsuccess',data.id);
                    data.emit('matchsuccess',socket.id);
                });
                // console.log(socketpool.free.pop(socket).id);
                // socketpool.busy.push(socketpool.free.pop());

            }
            console.log("请求id:"+socket.id);
            console.log("当前空闲玩家数:"+socketpool.free.length);
            console.log("当前游戏中的玩家数:"+socketpool.busy.length);
            console.log("总连接数:"+socketpool.allsock().length);
        });
        socket.on('send', function(data) {
            //将消息输出到控制台
            socket.partner.emit('msg',data);
            console.log(data);
        });
        socket.on('discon',function (data) {

            console.log("断开连接："+this.id);
            //他自己要断开连接 并且如果是游戏中，触发他的队友断开连接 状态改变！！！线程池移除未做 待改造
            if(this.partner!=null){
                this.partner.emit('discon');
                this.partner=null;
            }
            this.disconnect();
            socketpool.discon = this;
            // socketpool.freem=this;

        });
    });
    return io;
}

module.exports =createsocket;