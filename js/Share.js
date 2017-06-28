/**
 * Share JS
 * no dependence
 * update: 2014-12-26
 * version: 1.0.2
 * desc: + callback
 */

var Share = new function() {
    var P = this;

    P.obj = null;

    P.weibo = function(obj) {
        /**
         * var obj = {
         *      "title": title,
         *      "pic": "pic",
         *      "url": "url"
         * }
         */

        if (!obj || typeof obj !== 'object') {
            obj = P.obj;
            if (!obj || typeof obj !== 'object') {
                console.log('Error->share weibo obj error');
                return;
            }
        }
        var url = "http://service.weibo.com/share/share.php";
        var newUrl = concatUrl(url, obj);
        window.open(newUrl);
    };
    P.qzone = function(obj) {
        /**
         * var obj = {
         *      "title": "title",
         *      "pics": "picurl",
         *      "url": "url",
         *      "summary": "summary"  //desc
         * }
         */
        if (!obj || typeof obj !== 'object') {
            obj = P.obj;
            if (!obj || typeof obj !== 'object') {
                console.log('Error->share qzone obj error');
                return;
            }
        }
        var url = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey';
        var newUrl = concatUrl(url, obj);
        window.open(newUrl);
    };

    function initialize() {
        var userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.match(/MicroMessenger/i) == "micromessenger" && (typeof WeixinJSBridge !== undefined)) {  //微信客户端
            weixinApi();
        }
    }

    function weixinApi() {
        document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
            // 分享到朋友圈
            WeixinJSBridge.on('menu:share:timeline', timeline);
            // 发送给好友
            WeixinJSBridge.on('menu:share:appmessage', app);
            // 分享到微博
            WeixinJSBridge.on('menu:share:weibo', weibo);
        }, false);

        function timeline() {
            /**
             * var obj = {
             *      "img_url": share_pic,
             *      "img_width": "120",
             *      "img_height": "120",
             *      "link": share_url,
             *      "desc": share_desc,
             *      "title": share_title
             * }
             */
            try {
                WeixinJSBridge.invoke('shareTimeline', P.obj, function(res) {
                    P.obj && (typeof P.obj.callback === 'function') && P.obj.callback(res);
                });
            } catch (e) {
                console.log('WeixinJSBridge shareTimeline err: ' + e);
            }
        }  //分享到朋友圈
        function app() {
            /**
             * var obj = {
             *      "appid": null,
             *      "img_url": share_pic,
             *      "img_width": "120",
             *      "img_height": "120",
             *      "link": share_url,
             *      "desc": share_desc,
             *      "title": share_title
             * }
             */
            try {
                WeixinJSBridge.invoke('sendAppMessage', P.obj, function(res) {
                    P.obj && (typeof P.obj.callback === 'function') && P.obj.callback(res);
                });
            } catch (e) {
                console.log('WeixinJSBridge sendAppMessage err: ' + e);
            }
        }  //分享给好友
        function weibo() {
            /**
             * var obj = {
             *      "url": share_url,
             *      "content": share_desc,
             * }
             */
            try {
                WeixinJSBridge.invoke('shareWeibo', P.obj, function(res) {
                    P.obj && (typeof P.obj.callback === 'function') && P.obj.callback(res);
                });
            } catch (e) {
                console.log('WeixinJSBridge shareWeibo err: ' + e);
            }
        }  //分享到微博
    }

    function concatUrl(url, obj) {
        /**
         * concat url
         * @url String
         * @obj Object
         */
        if (!obj || typeof obj !== "object") {
            return url;
        }
        if (url.indexOf('?') < 0) {
            url += '?';
        } else {
            url += '&';
        }
        for (var va in obj) {
            url += va + "=" + encodeURIComponent(obj[va] || '') + "&";
        }
        var len = url.length;
        if (url[len - 1] === '&' || url[len - 1] === '?') {
            url = url.slice(0, len - 1);
        }
        console.log('Info->concatUrl: ' + url);
        return url;
    }

    initialize();
};