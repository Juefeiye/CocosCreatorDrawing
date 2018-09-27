"use strict";
cc._RF.push(module, '48e7bmlm/dGS72K5JY6GqM/', 'colors');
// scripts/colors.js

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
        bgView: cc.Node,
        click: cc.Node,
        colorID: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {

        var self = this;

        this.node.on('touchend', function () {
            self.teamPanel.selectColor(self.colorID);
        }, this);
    },

    updateColor: function updateColor(teamPanel, color, colorID) {
        this.color = color;
        this.colorID = colorID;
        this.teamPanel = teamPanel;
        this.bgView.color = cc.hexToColor(color);
    },

    showClick: function showClick() {
        this.click.active = true;
    },

    hideClick: function hideClick() {
        this.click.active = false;
    }

});

cc._RF.pop();