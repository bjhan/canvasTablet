

var CFG = (function() {
    var pathname = window.location.href;
    var sharePath = pathname.substr(0, pathname.lastIndexOf('/') + 1);
    var cfg = {
        shareUrl: sharePath + 'index.html?s=1&',
        shareImg: sharePath,
        shareSummary: '斗图之王卡牌全宇宙首发，千盒免费送~',
        desc: {
                  weibo:{
                      desc5: '厉害了我的哥！#表情包竟然能打牌#~@讯飞输入法 你这六周年斗图之王卡牌#6到飞起#啊，赵日天+叶良辰＝王炸？尔康和香菜双飞？还有萌击和巴拉拉魔法？求赐一副牌吧，我要要要要！',
                   	     },
                  qq:{
                      desc5: '厉害了我的哥！表情包竟然能打牌！@讯飞输入法 你这六周年斗图之王卡牌#6到飞起#啊，赵日天+叶良辰＝王炸？尔康和香菜双飞？还有萌击和巴拉拉魔法？求赐一副牌吧，我要要要要！',
                   	     },
                  pyq:{
                      desc5: '厉害了我的哥！表情包竟然能打牌！@讯飞输入法 送我一副呗！',
                  }
              }
        
    };
    return cfg;
})();