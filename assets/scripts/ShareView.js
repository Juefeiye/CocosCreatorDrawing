// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        shot: cc.Sprite,
        shotIndex : 0,
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },

    //截屏
    screenShot(callback) {

        if (this.screenshot == null) {
            this.screenshot = this.node.addComponent('Screenshot');
        }

        if (cc.sys.isBrowser) {
            this.onbtn_web(callback);
        }else if (CC_JSB) {
            this.onBtn_native(callback);
        }
        
    },

    onbtn_web(callback) {
        this.screenshot.screenshotCanvas((base64,frame) => {
            this.base64 = base64
            this.shot.spriteFrame = frame
            callback()
        });
    },

    onBtn_native(callback) {
        this.shotIndex = this.shotIndex + 1;
        var name = 'test' + this.shotIndex.toString() + '.png'

        this.screenshot.screenshotNative(name, 'low', frame => {
            this.shot.spriteFrame = frame;
            callback();
        });
    },

    hidden : function (){
        this.node.active = false;
    },


    //分享
    shareToPlatform : function (t,type){

        Tool.onEvent('Share', type);

        if(window.system&&system.go){
            //快应用
            system.go(`/download`)
        }else if (CC_JSB) {
            var fileName = 'test' + this.shotIndex.toString() + '.png'
            var fullPath = jsb.fileUtils.getWritablePath() + fileName;
            var info = JSON.stringify({'pic' : fullPath,'type' : type }) 
            var result = jsb.reflection.callStaticMethod("Tools","shareByClient:",info);
        }else if(cc.sys.isBrowser){
            if (kf != null) {
                var self = this
                kf.saveImageToLocal(this.base64, function(imagePath) {
                    self.imagePath = imagePath
                    var info = JSON.stringify({'pic' : self.imagePath,'type' : type }) 
                    kf.shareByClient(info)
                } )
            }
        }
    },


    //保存相册
    saveToAlbum : function (){

        Tool.onEvent('Save');
        
        if(window.system&&system.go){
            //快应用
            system.go(`/download`)
        }else if (CC_JSB) {
            //native
            var fileName = 'test' + this.shotIndex.toString() + '.png'
            var fullPath = jsb.fileUtils.getWritablePath() + fileName;
            var result = jsb.reflection.callStaticMethod("Tools","saveToAlbum:",fullPath);
        }else if(cc.sys.isBrowser){
            //web native
            if (kf != null) {
                kf.saveImageToAlbum(this.base64, function(imagePath) {
                    if (imagePath.length > 0) {
                        kf.toast('保存成功')
                    }else{
                        kf.toast('保存失败')
                    }
                } )
            }
        }
    },

    // update (dt) {},
});

