window.onload=function() {
    var grid;
    var chessArr = [];
    var timer = 0;
    var lineNum = 11;
    var box = document.getElementById('chessboard');
    var chessBox = box.getElementsByTagName('div');
    //棋盘初始化
    var chessMaxNum = lineNum * lineNum;
    var chessWH = 90 / lineNum;
    for (var i = 0; i < chessMaxNum; i++) {
        grid = document.createElement('div');
        grid.style.width = 'calc(' + chessWH + 'vmin - 2px)';
        grid.style.height = 'calc(' + chessWH + 'vmin - 2px)';
        grid.id = i;
        box.appendChild(grid);
        chessArr[i] = 0;
        grid.onclick = function (x) {
            var index = x.target.id || x.target.parentNode.id;
            socket.emit('gamereq', index);
            //socket.partner.emit('gamereq',index)
            return playChess(index);
        };
    }

    //棋子对象
    function Chess() {
        this.color = 'white';
        this.site = 0;
        this.chessDom = function () {
            var dom = document.createElement('p');
            dom.setAttribute('class', this.color);
            return dom;
        }
        this.ligature = function (arr) {
            var whiteChess = arr.map(function (s) {
                return (s.color == 'white') ? parseInt(s.site) : 0;
            });
            var blackChess = arr.map(function (s) {
                return (s.color == 'black') ? parseInt(s.site) : 0;
            });

            judge(whiteChess, '白子');
            judge(blackChess, '黑子');

            function judge(che, color) {
                for (var i = 0; i < che.length; i++) {
                    var x = che[i] % lineNum;
                    var y = parseInt(che[i] / lineNum);
                    if (x <= lineNum - 5 && y <= lineNum - 5 && che[i] != 0) {
                        if (che[i + 1 * lineNum + 1] != 0 && che[i + 2 * lineNum + 2] != 0 && che[i + 3 * lineNum + 3] != 0 && che[i + 4 * lineNum + 4] != 0) {
                            $('.mask').removeClass('hide');
                            alert(color + '获胜!');
                            // location.replace(location);
                            return true;
                        }
                    }
                    ;
                    if (y <= lineNum - 5 && che[i] != 0) {
                        if (che[i + 1 * lineNum] != 0 && che[i + 2 * lineNum] != 0 && che[i + 3 * lineNum] != 0 && che[i + 4 * lineNum] != 0) {
                            $('.mask').removeClass('hide');
                            alert(color + '获胜!');
                            // location.replace(location);
                            return true;
                        }
                    }
                    ;
                    if (x >= 4 && y <= lineNum - 5 && che[i] != 0) {
                        if (che[i + 1 * lineNum - 1] != 0 && che[i + 2 * lineNum - 2] != 0 && che[i + 3 * lineNum - 3] != 0 && che[i + 4 * lineNum - 4] != 0) {
                            $('.mask').removeClass('hide');
                            alert(color + '获胜!');
                            // location.replace(location);
                            return true;
                        }
                    }
                    ;
                    if (x <= lineNum - 5 && che[i] != 0) {
                        if (che[i + 1] != 0 && che[i + 2] != 0 && che[i + 3] != 0 && che[i + 4] != 0) {
                            $('.mask').removeClass('hide');
                            alert(color + '获胜!');
                            // location.replace(location);
                            return true;
                        }
                    }
                    ;
                }
                ;
            }
        }
    }

    function playChess(i) {
        if (chessArr[i] == 0) {
            timer++;
            chessArr[i] = new Chess();
            timer % 2 == 0 ? chessArr[i].color = 'black' : chessArr[i].color = 'white';
            chessArr[i].site = i;
            chessBox[i].appendChild(chessArr[i].chessDom());
            chessArr[i].ligature(chessArr);
        } else {
            alert('此处有子!');
        }
    }
    socket.on("gameres",function (data) {
        console.log("对手落子"+data);
        playChess(data)
    });
    $('#match').on('click', function () {
        socket.emit('match', null);
    });
    $('#sendmsg').on('click', function () {
        console.log('发送消息');
        var msgtosend = document.getElementById('msginput').value;
        $('.right').append('<ul class="am-comment am-comment-flip am-comment-secondary"><a href="#link-to-user-home"><img src="http://s.amazeui.org/media/i/demos/bw-2014-06-19.jpg?imageView/1/w/96/h/96" alt="" class="am-comment-avatar" width="48" height="48"></a><div class="am-comment-main"><header class="am-comment-hd"><div class="am-comment-meta"><a href="#link-to-user" class="am-comment-author">a handsome man</a> @<time datetime="'+getNowFormatDate()+'" title="2013年7月27日 下午7:54 格林尼治标准时间+0800">'+getNowFormatDate()+'</time></div></header><div class="am-comment-bd"><p>'+msgtosend+'</p></div></div></ul>');
        socket.emit('send', msgtosend);
        document.getElementById('msginput').value='';
        $('.right').scrollTop( $('.right')[0].scrollHeight );
    });
    $('#discon').on('click', function () {
        console.log('断开连接');
        socket.emit('discon', '断开连接');
    });
    socket.on('matchsuccess', function (data) {
        $('.right').empty();
        timer = 0;
        for (var i = 0; i < chessMaxNum; i++) {
            $('#'+i).empty();
            chessArr[i] = 0;
        }
        $('#match').text('Matched');
        $('#match').addClass('am-disabled');
        $('#sendmsg').removeClass('am-disabled');
        $('.mask').addClass('hide');
        console.log("匹配成功");
        $('.infobar p').text('Playing with: '+data.toString().slice(0,5));
    });
}
$(function () {


})