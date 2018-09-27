"use strict";
cc._RF.push(module, '228366EOehGlrhY/hqDxsPI', 'Model');
// scripts/Model.js

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


module.exports = cc.Class({
    name: 'paperModel',
    properties: {
        name: cc.String,
        asset: dragonBones.DragonBonesAsset,
        atlasAsset: dragonBones.DragonBonesAtlasAsset,
        spritFrame: cc.spritFrame,
        paperFrame: cc.spritFrame,
        url: cc.AudioClip
    }
});

cc._RF.pop();