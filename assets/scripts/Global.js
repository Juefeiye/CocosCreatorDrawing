// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html



window.Global = {
    uri : "https://xbly.xingbook.com",
    paperModel : null,
};


window.Tool = {
    currentPlaySound : null,
    play : function(filePath, loop = false, volume = 1) {

        if (this.currentPlaySound) {
            cc.audioEngine.stop(this.currentPlaySound);
        }

        if (filePath){
            this.currentPlaySound = cc.audioEngine.play(filePath, loop, volume);   
        }

    },

    //talkdata
    onEvent : function (EventId , Label) {
        if (typeof TDAPP === 'object'){
            TDAPP.onEvent(EventId, Label);
        }
    },

    /**
     * 判断客户端类型
     * @returns {{isAndroid: boolean, isIOS: boolean, isIOS_high_version: boolean}}
     */
    checkClient : function (){
    const ua = navigator.userAgent;
    return {
        isAndroid : ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1, //android终端
        isIOS: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),               //ios终端
        isIOS_high_version:!!ua.match(/OS ([8-9]{1}|\d{2,})_.* like Mac OS X/i),
        isOtt : ua.indexOf('Xingbook/pad') > -1,
    }
}
};

export const target = new cc.EventTarget();
