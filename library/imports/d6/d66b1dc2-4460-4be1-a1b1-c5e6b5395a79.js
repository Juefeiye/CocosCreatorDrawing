"use strict";
cc._RF.push(module, 'd66b13CRGBL4aGxxea1OVp5', 'ImageP');
// scripts/ImageP.js

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
        imageView: cc.Sprite,
        imageID: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {

        var self = this;
        this.node.on('touchend', function () {
            self.teamPanel.selectImage(self.imageID);
        }, this);
    },

    updateSpriteFrame: function updateSpriteFrame(teamPanel, spriteFrame, imageID) {

        this.imageID = imageID;
        this.teamPanel = teamPanel;
        this.imageView.spriteFrame = spriteFrame;
    }
});

cc._RF.pop();