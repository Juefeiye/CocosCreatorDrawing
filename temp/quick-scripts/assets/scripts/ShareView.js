(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/ShareView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9ceban09b9KAJ1D2zxw3cd0', 'ShareView', __filename);
// scripts/ShareView.js

'use strict';

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
        shotIndex: 0

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},


    //截屏
    screenShot: function screenShot(callback) {

        if (this.screenshot == null) {
            this.screenshot = this.node.addComponent('Screenshot');
        }

        if (cc.sys.isBrowser) {
            this.onbtn_web(callback);
        } else if (CC_JSB) {
            this.onBtn_native(callback);
        }
    },
    onbtn_web: function onbtn_web(callback) {
        var _this = this;

        this.screenshot.screenshotCanvas(function (base64, frame) {
            _this.base64 = base64;
            _this.shot.spriteFrame = frame;
            callback();
        });
    },
    onBtn_native: function onBtn_native(callback) {
        var _this2 = this;

        this.shotIndex = this.shotIndex + 1;
        var name = 'test' + this.shotIndex.toString() + '.png';

        this.screenshot.screenshotNative(name, 'low', function (frame) {
            _this2.shot.spriteFrame = frame;
            callback();
        });
    },


    hidden: function hidden() {
        this.node.active = false;
    },

    //分享
    shareToPlatform: function shareToPlatform(t, type) {

        Tool.onEvent('Share', type);

        if (window.system && system.go) {
            //快应用
            system.go('/download');
        } else if (CC_JSB) {
            var fileName = 'test' + this.shotIndex.toString() + '.png';
            var fullPath = jsb.fileUtils.getWritablePath() + fileName;
            var info = JSON.stringify({ 'pic': fullPath, 'type': type });
            var result = jsb.reflection.callStaticMethod("Tools", "shareByClient:", info);
        } else if (cc.sys.isBrowser) {
            if (kf != null) {
                var self = this;
                kf.saveImageToLocal(this.base64, function (imagePath) {
                    self.imagePath = imagePath;
                    var info = JSON.stringify({ 'pic': self.imagePath, 'type': type });
                    kf.shareByClient(info);
                });
            }
        }
    },

    //保存相册
    saveToAlbum: function saveToAlbum() {

        Tool.onEvent('Save');

        if (window.system && system.go) {
            //快应用
            system.go('/download');
        } else if (CC_JSB) {
            //native
            var fileName = 'test' + this.shotIndex.toString() + '.png';
            var fullPath = jsb.fileUtils.getWritablePath() + fileName;
            var result = jsb.reflection.callStaticMethod("Tools", "saveToAlbum:", fullPath);
        } else if (cc.sys.isBrowser) {
            //web native
            if (kf != null) {
                kf.saveImageToAlbum(this.base64, function (imagePath) {
                    if (imagePath.length > 0) {
                        kf.toast('保存成功');
                    } else {
                        kf.toast('保存失败');
                    }
                });
            }
        }
    }

    // update (dt) {},
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=ShareView.js.map
        