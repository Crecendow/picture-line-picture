var wrap = document.getElementsByClassName('wrapper')[0];
var rows = 7;   // 创建连连看行数
var cols = 8;  // 创建连连看列数
var type = 24   //选择多少种图片，0-24都可以  看自己心情 数字大种类多  数字小种类少游戏难度更简单
var squareSet = [];    // 生成小方块的数组
var chooseOne = null; //
var chooseTwo = null; //
var x = 0 ;
var y = 0 ;
var Toward = { node: null, up: { row: -1, col: 0 }, right: { row: 0, col: 1 }, down: { row: 1, col: 0 }, left: { row: 0, col: -1 } }
window.onload = function () {
    init(); //初始化
}

function init() {
    if (rows * cols % 2 != 0) { //判断小方块总数是否为奇数，奇数就不执行
        alert('展示数量不能为奇数')  //  弹出提示，阻塞js加载
    }
    initSquareSet();
}
function initSquareSet() {
    // 方块默认长宽都是80px
    wrap.style.height = rows * 80 + 'px';   // 外面盒子的总高度
    wrap.style.width = cols * 80 + 'px';  // 外面盒子的总宽度
    var oDiv = document.createElement('div')
    var tmp = createRandomNum();  //生成随机数数组   我的图片名称是0.jpg~24.jpg 函数生成0~24随机数就可以通过字符串拼接动态的选择图片

    squareSet = new Array(rows + 2);  // 生成小方块的数组   既有行又有列  我们就要利用for循环生成二维数组 57~60
    for (var i = 0; i < squareSet.length; i++) {
        squareSet[i] = new Array(cols + 2);
    }

    for (var i = 1; i <= rows; i++) {  // 生成行数
        for (var j = 1; j <= cols; j++) { // 生成列数 同理
            var temp = createSquare(tmp.pop(), i, j); // 参数每次取随机数数组的最后一位  i小方块在整体中行的位置j是列的位置   temp接收这个返回的DOM元素
            squareSet[i][j] = temp;
            wrap.append(temp);
            temp.onclick = function () {
                if (chooseOne == null || chooseOne.num != this.num) {   // 判断是第一次点击还是第二次 77~81 没有值或者说没有属性的都是第一次点击
                    chooseOne = this;
                } else {
                    chooseTwo = this;
                    if (chooseOne != chooseTwo && chooseOne.num == chooseTwo.num ) { //判断第一次和第二次点击不是同一个 并且num值相等  以及是否在路径上可以消除
/*                        alert(chooseOne.row);
                        alert(chooseOne.col);
                        alert(chooseTwo.row);
                        alert(chooseTwo.col);*/
                        clearSquare(chooseOne.row, chooseOne.col);
                        clearSquare(chooseTwo.row, chooseTwo.col);
                    }
                    chooseOne = null;
                    chooseTwo = null;
                }
                render(); // 点击方块变换样式


                if(wrap.childNodes.length == 0){
                    alert("我我我我我，玩完了麻烦告诉我一声");
                }
            }
        }
    }

}
function createRandomNum() {
    var tmp = [] // 存放生成图片是  字符串拼接的数字

    // rows * cols 可以算出需要多少张图片 然后除以2 因为每张图片都是成对出现的  即 7*12=84张图片  84/2=41算出有42对
    for (var i = 0; i < rows * cols / 2; i++) {
        var num = Math.floor(Math.random() * type)  // 生成0~24的随机数
        tmp.push(num);
        tmp.push(num); // 循环了42次  所以push两遍 相当如每次push了相同的一对数，42次 正好84张图片
    }
    // console.log(tmp)  // 看看生成的数组  可以看到成对的随机数字数组
    tmp.sort(function () {
        return Math.random() - 0.5  //可以打乱数组
    })
    // console.log(tmp)  // 看看生成的数组  可以看到已经不成对的随机数字数组
    return tmp           // 将数组返回回去
}


function createSquare(num, row, col) {
    var temp = document.createElement('div');
    temp.classList.add('square');
    temp.style.backgroundImage = "url('images/" + num + ".jpg')";
    temp.style.top = row * 80 + 'px'; // 生成方块的位置 96,97
    temp.style.left = col * 80 + 'px';
    temp.num = num; //设置小方块的随机数属性 到时候可以用来判断属性是否一样来判断是否消除小方块
    temp.col = col;
    temp.row = row;
    return temp;   //返回了一个带着属性的DOM元素
}

function render() {
    for (var i = 0; i < squareSet.length; i++) {  //做一个样式的切换
        for (var j = 0; j < squareSet[i].length; j++) {
            if (squareSet[i][j] && squareSet[i][j] == chooseOne) {
                squareSet[i][j].style.opacity = '0.5';
            } else if (squareSet[i][j]) {
                squareSet[i][j].style.opacity = '1';
            }
        }
    }
}
function clearSquare(x, y) {
    wrap.removeChild(squareSet[x][y]); // 删除方块
    squareSet[x][y] = null;
}
