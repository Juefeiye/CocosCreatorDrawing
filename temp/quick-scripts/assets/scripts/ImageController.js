(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/ImageController.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6ecd9x1+URHz62lTQAVCx4u', 'ImageController', __filename);
// scripts/ImageController.js

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
        home: cc.Node,

        imagePrefab: cc.Prefab,
        images: {
            default: [],
            type: cc.SpriteFrame
        },

        audios: {
            default: [],
            url: [cc.AudioClip]
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {

        this.items = [];
        this.selectIndex = 0;
        this.canvas = this.home.getComponent('HomeUI');
        for (var i = 0; i < this.images.length; ++i) {
            var item = cc.instantiate(this.imagePrefab);
            var sf = this.images[i];
            this.node.addChild(item);
            item.getComponent('ImageP').updateSpriteFrame(this, sf, i);
            this.items.push(item);
        }
    },


    selectImage: function selectImage(index) {

        Tool.play(this.audios[index]);
        this.selectIndex = index;
        this.canvas.set_bg_image(this.images[index]);
        Tool.onEvent('Background', this.images[index].name);
    }
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
        //# sourceMappingURL=ImageController.js.map
        