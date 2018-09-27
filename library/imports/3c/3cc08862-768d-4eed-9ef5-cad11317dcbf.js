"use strict";
cc._RF.push(module, '3cc08hido1O7Z71ytETF9y/', 'PaperPrefab');
// scripts/PaperPrefab.js

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
        paperView: cc.Sprite,
        click: cc.Node,
        paperID: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.items = [];
        var self = this;
        this.node.on('touchend', function () {
            self.teamPanel.selectPaper(self.paperID);
        }, this);
    },


    updateSpriteFrame: function updateSpriteFrame(teamPanel, spriteFrame, paperID) {
        this.paperID = paperID;
        this.teamPanel = teamPanel;
        this.paperView.spriteFrame = spriteFrame;
    },

    showClick: function showClick() {
        this.click.active = true;
    },

    hideClick: function hideClick() {
        this.click.active = false;
    }
});

cc._RF.pop();