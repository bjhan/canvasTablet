/**
 * Created by Administrator on 2017/6/28.
 */
(function () {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    if (canvas.getContext) {
        console.log('支持canvas');
    } else {
        console.log('不支持canvas');
    }

    canvas.width = 300;
    canvas.height = 400;

    var starX,starY;
    canvas.addEventListener('touchstart',touchStar);
    canvas.addEventListener('touchmove',touchMove);
    //canvas.addEventListener('touchend',touchEnd);


    document.getElementById('savepic').onclick = function(){
        var type = 'png';
        download(type);
    }
//图片下载操作,指定图片类型
    function download(type) {
        //设置保存图片的类型
        var imgdata = canvas.toDataURL(type);
        //将mime-type改为image/octet-stream,强制让浏览器下载
        var fixtype = function (type) {
            type = type.toLocaleLowerCase().replace(/jpg/i, 'jpeg');
            var r = type.match(/png|jpeg|bmp|gif/)[0];
            return 'image/' + r;
        }
        imgdata = imgdata.replace(fixtype(type), 'image/octet-stream')
        //将图片保存到本地
        var saveFile = function (data, filename) {
            var link = document.createElement('a');
            link.href = data;
            link.download = filename;
            var event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            link.dispatchEvent(event);
        }
        var filename = new Date().toLocaleDateString() + '.' + type;
        saveFile(imgdata, filename);
    }

    function touchStar(e){

        // 取得鼠标位置
        var x = e.touches[0].pageX - canvas.offsetLeft;
        var y = e.touches[0].pageY - canvas.offsetTop;

        drawDot(x,y);
    }

    function touchMove(e){
        var x = e.touches[0].pageX - canvas.offsetLeft;
        var y = e.touches[0].pageY - canvas.offsetTop;

        drawDot(x,y);
    }

    function drawDot(x,y){
        context.beginPath();
        context.arc(x,y,10,0,2*Math.PI);
        context.fillStyle= 'rgb('+getrandom1()+','+getrandom2()+','+getrandom3()+')';
        context.fill();
        context.closePath();
    }

    function getrandom1(){
        var ss = Math.random()*255;
        return Math.floor(ss);
    }
    function getrandom2(){
        var ss = Math.random()*255;
        return Math.floor(ss);
    }
    function getrandom3(){
        var ss = Math.random()*255;
        return Math.floor(ss);
    }
})();