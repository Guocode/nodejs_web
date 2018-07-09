$(document).ready(
    function() {
        var grid;
        var chessArr = [];
        var timer = 0;
        var lineNum = 11;
        var box = document.getElementById('chessboard');
        var chessBox = box.getElementsByTagName('div');
        var submitBtn = document.getElementById('submitBtn');

        //棋盘初始化
        // submitBtn.onclick = function(){
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
                return playChess(index);
            };

        }
        ;
        // mask.style.display = 'none';
        // }

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
                                alert(color + '获胜!');
                                location.replace(location);
                                return true;
                            }
                        }
                        ;
                        if (y <= lineNum - 5 && che[i] != 0) {
                            if (che[i + 1 * lineNum] != 0 && che[i + 2 * lineNum] != 0 && che[i + 3 * lineNum] != 0 && che[i + 4 * lineNum] != 0) {
                                alert(color + '获胜!');
                                location.replace(location);
                                return true;
                            }
                        }
                        ;
                        if (x >= 4 && y <= lineNum - 5 && che[i] != 0) {
                            if (che[i + 1 * lineNum - 1] != 0 && che[i + 2 * lineNum - 2] != 0 && che[i + 3 * lineNum - 3] != 0 && che[i + 4 * lineNum - 4] != 0) {
                                alert(color + '获胜!');
                                location.replace(location);
                                return true;
                            }
                        }
                        ;
                        if (x <= lineNum - 5 && che[i] != 0) {
                            if (che[i + 1] != 0 && che[i + 2] != 0 && che[i + 3] != 0 && che[i + 4] != 0) {
                                alert(color + '获胜!');
                                location.replace(location);
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
    }
)