(function () {
    var DOC = document;
    var Base = BASE;
    var Touch = Base.cfg.isTouch;
    var $$ = Base.getEle;
    var $D = Base.disEle,
        $G = Base.getUrl;
        $CREATESTYLE = Base.createStyle,
        $ADPALLSTYLE = Base.adpAllStyle;
        $text = Base.txtEle;
        $STOPPROPAGATION = Base.stopPropagation;
        $rmvEle = Base.rmvEle;
    var body = DOC.body;
    var text;
    var Title = DOC.title;
    var timer;
    var Plat = '';
    var pic_src = '';
    var bfb;

    //初始化页面
    function initialize() {
        var nav = navigator.userAgent.toLowerCase();

        $$("#my_bt").onclick = function () {
            //$D($$('#video_area'));
            pic_src = "img/sloth.png";
                checkPlat();
                //gotoShare2();
            Baidu('分享赢取');
        };
        $$("#control").onclick = function () {
            Baidu('视频');
        $D($$('#control'));
        $$("#video").play();
        $$("#video").controls=true;
        };
        //$$("#control2").onclick = function () {
        //        $D($$('#control2'));
        //        $$("#video").play();
        //        $$("#video").controls=true;
        //        }
        //$$("#video").addEventListener('pause',function(){
        // $D($$('#control2'),1);
        // $$("#video").controls=false;
        //});
        //$$("#video").ondblclick= function () {
        //$$("#video").pause();
        //}
        // $$("#video").addEventListener('ended',function(){
        //         $D($$('#control2'));
        //         $D($$('#control'),1);
        //         $$("#video").controls=false;
        //        });
        setTimeout(function() {
            $D(body, 1);
        }, 0);
    }

    //初始化结果弹窗
    function initShare() {
            fadeIn($$("#share"), 10);
            $rmvEle($$("#share2_teng"), false);
        $rmvEle($$("#share2_webo"), false);
        //    gotoShare();

    }

    function initShareGuide(guide) {
        fadeIn($$("#share"), 10);
        // $$("#share").style.display = "block";
        $$("#share2").style.display = "none";
        $$("#share2_teng").style.display = "none";
        $$("#share2_webo").style.display = "none";
        //$text($$("#share_text"), "点击右上角分享到"+guide);
    }

    //判断用户打开页面的平台并做出相应的弹窗变化
    function checkPlat() {
        var userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.indexOf('iflytek_mmp') > -1) {
            Plat = 'ime';
            var e = exec("imeExtendComponents", "getShareAppInfo", []);
            var msg = getResultMessage(e);
            msg && (ImeShare = {
                qzone: msg.indexOf('com.qzone') >= 0 ? 1 : 0,
                qq: msg.indexOf('com.tencent.mobileqq') >= 0 ? 1 : 0,
                wb: msg.indexOf('com.sina.weibo') >= 0 ? 1 : 0,
                wx: msg.indexOf('com.tencent.mm') >= 0 ? 1 : 0
            });
            initShare2();

        } else if (userAgent.match(/MicroMessenger/i) == "micromessenger") {
            Plat = 'wx';
            $$("#shareimg").src="img/picture_Wchat.png";
            initShareGuide('朋友圈');
        } else if (userAgent.indexOf('qq') > 0) {
            $$("#shareimg").src="img/picture_QQ.png";
            initShareGuide('QQ空间');
        } else if (userAgent.indexOf('qzone') > 0) {
            $$("#shareimg").src="img/picture_QQ.png";
            initShareGuide('QQ空间');
        } else if (userAgent.indexOf('weibo') > 0) {
            $$("#shareimg").src="img/picture_weibo2.png";
            initShareGuide('微博');
        }else {
            //$$("#shareimg").src="img/picture_Wchat.png";
            //initShareGuide('朋友圈');
            initShare2();

            //$D($$("#pyq_pic"));
        }
    }
    function initShare2() {
            fadeIn($$("#share"), 10);
            $rmvEle($$("#share1"), false);
            $rmvEle($$("#share2_webo"), false);
            gotoShare();

    }
    //定义分享的函数，按钮绑定了各自的分享
    function gotoShare() {
        register();
        function register() {
            $$("#shut").onclick = function () {
                $D($$('#video_area'),1);
                Baidu("关闭分享页面");
                $$("#share").style.display = "none";
            };

            $$("#qq_pic").onclick = function () {
                Baidu("分享空间按钮");
                setTimeout(shareQQ, 0);
            };

            $$("#pyq_pic").onclick = function () {
                Baidu("分享朋友圈按钮");
                setTimeout(sharePyq, 0);
            };

        }
        function shareQQ() {
             pic_src="img/3003000.jpg";
            var qq_desc  = CFG.desc.qq.desc5;
            var title = Title;
            var url = CFG.shareUrl + "n=1&" + getRandomStr();
            var desc = qq_desc;
            var img = CFG.shareImg  + pic_src;
            var summary = CFG.shareSummary;

            if (Plat === 'ime' && ImeShare.qzone)
                return exec("imeExtendComponents", 'share_qzone', [title, desc, url, img, img]);
            if (Plat === 'ime' && ImeShare.qq)
                return exec("imeExtendComponents", 'share_qq', [title, desc, url, img, img]);

            Share.qzone({
                "title": title,
                "desc": CFG.desc.qq.desc5,
                "pics": img,
                "url": url,
                "summary": summary
            });
        }

        function sharePyq() {
            pic_src="img/3003000.jpg";
            qq_desc  = CFG.desc.pyq.desc5;
            var title = Title;
            var url = CFG.shareUrl + "n=3&" + getRandomStr();
            var desc = qq_desc;
            var img = CFG.shareImg + pic_src;

            if (Plat === 'ime')
                exec("imeExtendComponents", 'share_mm', [title, desc, url, img, img]);
        }
    }


    function getRandomStr() {
        return 'r' + getRandom(9) + '=' + getRandom(100000);
    }
    function getRandom(val) {
        return Math.round(Math.random() * val);
    }
    function getbfb(x){
        if(x >= 65){
            bfb = 99.9
        }else{
            bfb = (x*100/65).toFixed(1);
        }
        return bfb + "%";
    }

    function fadeIn(elem, speed, opacity){
        /*
         * 参数说明
         * elem==>需要淡入的元素
         * speed==>淡入速度,正整数(可选)
         * opacity==>淡入到指定的透明度,0~100(可选)
         */
        speed = speed || 20;
        opacity = opacity || 100;
        //显示元素,并将元素值为0透明度(不可见)
        elem.style.display = 'block';
        elem.style.opacity = 0;
        //初始化透明度变化值为0
        var val = 0;
        //循环将透明值以5递增,即淡入效果
        while(val <= 100){
            val = val +5;
            setTimeout(function(){elem.style.opacity = val;},100);
        }
    }

    //定义百度统计按钮点击次数的函数
    function Baidu(category, evnet) {
        !evnet && (evnet = '点击');
        try {
            _hmt.push(['_trackEvent', category , evnet]);
        } catch (e) {
            console.log(e);
        }
    }

    //适配移动端以及pc端
    (function () {
        if (Touch) {
            styleStr = '#main {width:720px;}#bj{width: 720px;height: 960px;}#shareimg {}#video_area {top:341px;left:46px;width: 628px;height: 365px;border: 1px solid rgba(255,255,255,0.2);}#video {top: 13px;width: 600px;height: 338px;left: 14px;}#control {top:115px;left:240px;width: 130px;height: 130px;}#control2 {top:115px;left:240px;width: 130px;height: 130px;}#content img {margin-top: 70px;margin-left: 132px;width: 466px;height: 60px;}#mytext {top:750px;top:750px;width: 100%;color: #c05e06;font-size: 24px;}#my_bt {top:802px;left:180px;width: 363px;height: 118px;}#bt_active {width: 363px;height: 118px;}#share {width: 720px;height:1280px;top: 0;background-color: rgba(0, 0, 0, 0.7);}#share_area {top: 0px;margin-left: 0px;}#result_bj,#result_bj2 {top:208px;left: 129px;width: 441px;height: 376px;}#shut,#shut2 {top: 338px;left: 473px;width: 54px;height: 54px;}#share1 {left: 138px;top: 30px;}#share1 img {width: 537px;height: 190px;}#result_text {top: 578px;font-size: 36px;}#result_text p:first-child {margin-left: 40px;}#result_text p:last-child {margin-left: 91px;}#in_numbers {font-size: 40px;}#share2,#share22 {margin-top: 621px;}#share2 img,#share22 img {width: 96px;height: 161px;}#share2 p {font-size: 23.4px;padding-top: 10px;padding-left: 10px;}#pyq_pic {margin-left: 90px;}#qq_pic {margin-left: 217px;}#weibo_pic {margin-left: 310px;}';
            $ADPALLSTYLE(styleStr, 'css', initialize);
        } else {
            styleStr = '#main{width:720px;}'
            $CREATESTYLE(styleStr, 'css', initialize);
        }
    })();
})();