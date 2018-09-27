(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/SubBtnsUI.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '73d820NT4lNEqd1nxEXH0sF', 'SubBtnsUI', __filename);
// scripts/SubBtnsUI.js

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
        subBtnsAnim: cc.Animation,
        btnShowSub: cc.Button,
        btnHideSub: cc.Button,

        pushAnimationNames: {
            default: [],
            type: cc.String
        },

        popAnimationNames: {
            default: [],
            type: cc.String
        },

        containers: {
            default: [],
            type: cc.Node
        }

    },

    // use this for initialization
    onLoad: function onLoad() {
        this.state = 0; // 0.画笔 1.贴纸 2.画布背景
        this.oldState = 0;
        this.isShow = false;
        this.needShow = false;
        this.btnShowSub.node.active = true;
        this.btnHideSub.node.active = false;

        //防止画板接收菜单touch事件
        this.node.on('touchend', function (event) {
            event.stopPropagation();
        }, this);

        this.node.on('touchmove', function (event) {
            event.stopPropagation();
        }, this);

        this.node.on('touchstart', function (event) {
            event.stopPropagation();
        }, this);

        this.node.on('touchcancel', function (event) {
            event.stopPropagation();
        }, this);
    },

    showBtn: function showBtn() {
        this.showSubBtns(this.state);
    },
    hideBtn: function hideBtn() {
        this.hideSubBtns(this.state);
    },


    showSubBtns: function showSubBtns(state) {

        //没有显示菜单
        if (!this.isShow && state > -1) {
            this.state = state;
            if (this.oldState != this.state && this.oldState != undefined) {
                this.containers[this.oldState].active = false;
            }
            this.needShow = false;
            this.subBtnsAnim.play(this.pushAnimationNames[this.state]);
            this.containers[this.state].active = true;
            this.oldState = this.state;
        } else {

            if (state < 0) {
                this.state = state;
                this.hideBtn();
                return;
            }

            //已显示
            if (state == this.state) {
                return;
            }
            //先pop原来的菜单
            this.subBtnsAnim.play(this.popAnimationNames[this.oldState]);
            this.state = state;
            this.needShow = true;
        }
    },

    hideSubBtns: function hideSubBtns(state) {

        if (!this.isShow) {
            return;
        }

        if (state < 0) {
            this.subBtnsAnim.play(this.popAnimationNames[this.oldState]);
        } else {
            this.state = state;
            this.subBtnsAnim.play(this.popAnimationNames[this.state]);
        }
    },

    onFinishAnim: function onFinishAnim(finishFold) {
        this.btnShowSub.node.active = finishFold;
        this.btnHideSub.node.active = !finishFold;
        this.isShow = !finishFold;
        if (this.needShow) {
            this.showBtn();
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
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
        //# sourceMappingURL=SubBtnsUI.js.map
        