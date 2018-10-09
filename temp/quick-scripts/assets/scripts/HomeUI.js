(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/HomeUI.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '309baT8+yxDtLMEMBv0zLOe', 'HomeUI', __filename);
// scripts/HomeUI.js

"use strict";

var _Global = require("Global");

var _request = require("request");

var _request2 = _interopRequireDefault(_request);

var _constants = require("constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var httpUtils = require("HttpUtils");
var paperModel = require("Model");

var DrawingState = cc.Enum({
    draw: 0,
    rubber: 1,
    paper: 2
});

cc.Class({

    extends: cc.Component,

    properties: {
        bgImageView: cc.Sprite,
        menu: cc.Layout,
        subMenu: cc.Node,
        shareView: cc.Node,
        phoneDesk: cc.Node,
        phoneDeskAnim: cc.Animation,
        rightView: cc.Node,
        backBtn: cc.Button,
        panWidth: 0,
        rubberWidth: 0,
        beginAudio: {
            default: null,
            url: cc.AudioClip
        }
    },

    // use this for initialization
    onLoad: function onLoad() {

        // if (channel) {
        //     Tool.onEvent(channel);
        // }

        Tool.onEvent('Start');
        Tool.play(this.beginAudio);
        this.subMenu = this.subMenu.getComponent('SubBtnsUI');
        this.menuIndex = 1;
        this.menuBtns = this.menu.node.getComponentsInChildren(cc.Button);
        this.setMenuIndex(null, 1);
        this.is_click = false;
        this.drawing_state = DrawingState.draw;
        this.set_touch_ctrl();
    },

    //设置touch事件
    set_touch_ctrl: function set_touch_ctrl() {

        var self = this;
        var mhight = self.node.getContentSize().height;
        this.vsibleWidth = 1640 - (1920 - cc.director.getVisibleSize().width); //实际宽度
        self.rt = new cc.RenderTexture(this.vsibleWidth, mhight);
        self.node._sgNode.addChild(self.rt);
        self.rt.begin();
        self.rt.end();
        self.touchId = null;

        //TOUCH_START
        this.node.on(cc.Node.EventType.TOUCH_START, function (touch, event) {

            if (self.touchId != null) {
                return false;
            }

            self.touchId = touch.touch.__instanceId;
            var touchLoc = touch.getLocation();

            if (self.drawing_state == DrawingState.paper && Global.paperModel) {
                if (Global.paperModel.asset) {
                    self.paperTaget = new cc.Node();
                    self.node.addChild(self.paperTaget);
                    self.armatureDisplay = self.paperTaget.addComponent(dragonBones.ArmatureDisplay);
                    self.armatureDisplay.dragonAsset = Global.paperModel.asset;
                    self.armatureDisplay.dragonAtlasAsset = Global.paperModel.atlasAsset;
                    self.armatureDisplay.armatureName = 'Armature';
                    self.armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, self.animationEventHandler, self);
                    self.armatureDisplay.addEventListener(dragonBones.EventObject.START, self.animationEventHandler, self);
                } else {
                    self.armatureDisplay = null;
                    self.paperTaget = new cc.Node();
                    self.node.addChild(self.paperTaget);
                    var spritf = self.paperTaget.addComponent(cc.Sprite);
                    spritf.spriteFrame = Global.paperModel.spriteFrame;
                }

                touchLoc = self.node.convertToNodeSpaceAR(touchLoc);
                self.paperTaget.position = cc.v2(touchLoc.x, touchLoc.y);
                return true;
            }

            self.originPoint = touchLoc;
            self.is_click = true;
            self.drawWithLocation(touchLoc);
            touchLoc.x += 1;
            touchLoc.y += 1;
            self.drawWithLocation(touchLoc);
            return true;
        }.bind(this), this.node);

        //TOUCH_MOVE
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (touch, event) {

            if (self.touchId != touch.touch.__instanceId) {
                return false;
            }

            var touchLoc = touch.getLocation();

            if (self.drawing_state == DrawingState.paper && Global.paperModel) {
                touchLoc = self.node.convertToNodeSpaceAR(touchLoc);
                self.paperTaget.position = cc.v2(touchLoc.x, touchLoc.y);
                return true;
            }

            self.drawWithLocation(touchLoc);

            return true;
        }.bind(this), this.node);

        //TOUCH_END
        this.node.on(cc.Node.EventType.TOUCH_END, function (touch, event) {
            if (self.touchId != touch.touch.__instanceId) {
                return false;
            }

            console.log('TOUCH_END');

            self.touchId = null;
            var touchLoc = touch.getLocation();

            if (self.drawing_state == DrawingState.paper && Global.paperModel) {
                touchLoc = self.node.convertToNodeSpaceAR(touchLoc);

                if (self.armatureDisplay) {
                    self.paperTaget.position = cc.v2(touchLoc.x, touchLoc.y);
                    self.armatureDisplay.playAnimation(Global.paperModel.name, 1);
                } else {
                    touchLoc.x += self.vsibleWidth / 2;
                    touchLoc.y += self.node.getContentSize().height / 2;
                    self.paperTaget.position = cc.v2(touchLoc.x, touchLoc.y);
                    self.rt.begin();
                    self.paperTaget._sgNode.visit();
                    self.rt.end();
                    self.paperTaget.removeFromParent();
                }

                return true;
            }

            if (self.is_click) {
                self.is_click = false;
            }
        }.bind(this), this.node);

        //TOUCH_CANCEL
        this.node.parent.on(cc.Node.EventType.TOUCH_CANCEL, function (touch) {

            if (self.touchId == touch.touch.__instanceId) {
                if (self.drawing_state == DrawingState.paper && Global.paperModel) {
                    self.paperTaget.removeFromParent();
                }
                console.log('TOUCH_CANCEL');
            }

            self.touchId = null;
            self.is_click = false;
        }.bind(this), this.node);
    },

    //画画 、 橡皮
    drawWithLocation: function drawWithLocation(touchLoc) {

        var self = this;

        if (!self.is_click) {
            return;
        }

        // console.log(self.rt._renderCmd);

        touchLoc = self.node.convertToNodeSpaceAR(touchLoc);
        touchLoc.x += self.vsibleWidth / 2;
        touchLoc.y += self.node.height / 2;
        //涂色
        if (self.drawing_state == DrawingState.draw) {
            var originPoint = self.originPoint;
            var e1 = new cc.DrawNode();
            // e1.glEnable( cc.GL_LINE_SMOOTH);
            e1.drawSegment(originPoint, touchLoc, self.panWidth, self.color);
            self.rt.begin();
            e1.visit();
            self.rt.end();
            self.originPoint = touchLoc;
        }
        //橡皮擦
        else if (self.drawing_state == DrawingState.rubber) {

                var _originPoint = self.originPoint;
                var ctx = self.rt._renderCmd._cacheContext.getContext();

                var locCanvas = self.rt._renderCmd._cacheCanvas;
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                self.rt._renderCmd._cacheContext.setFillStyle("rgba(0,0,0,0)");
                ctx.fillRect(touchLoc.x - 30, 1080 - touchLoc.y - 30, 60, 60);

                ctx.lineCap = "round";
                ctx.lineJoin = "round";
                ctx.lineWidth = 60;

                ctx.save();
                ctx.beginPath();
                ctx.moveTo(_originPoint.x, 1080 - _originPoint.y);
                ctx.lineTo(touchLoc.x, 1080 - touchLoc.y);
                ctx.stroke();
                ctx.restore();

                self.originPoint = touchLoc;
            }
    },

    //贴纸动画结束
    animationEventHandler: function animationEventHandler(event) {
        var self = this;
        if (event.type === dragonBones.EventObject.COMPLETE) {

            if (self.drawing_state == DrawingState.rubber) {
                var ctx = this.rt._renderCmd._cacheContext.getContext();
                ctx.globalCompositeOperation = "source-over";
            }

            var loc = event.currentTarget.parent.getPosition();
            loc.x += self.vsibleWidth / 2;
            loc.y += self.node.getContentSize().height / 2;
            event.currentTarget.parent.setPosition(loc.x, loc.y);

            self.rt.begin();
            event.currentTarget.parent.visit();
            self.rt.end();
            event.currentTarget.parent.removeFromParent();

            if (self.drawing_state == DrawingState.rubber) {
                var ctx = this.rt._renderCmd._cacheContext.getContext();
                ctx.globalCompositeOperation = "destination-out";
            }
        }
    },

    //画板状态
    set_drawing_state: function set_drawing_state(num) {
        num = parseInt(num);
        this.drawing_state = num;

        if (this.rt) {
            if (num == DrawingState.rubber) {
                var ctx = this.rt._renderCmd._cacheContext.getContext();
                ctx.globalCompositeOperation = "destination-out";
            } else {
                var ctx = this.rt._renderCmd._cacheContext.getContext();
                ctx.globalCompositeOperation = "source-over";
            }
        }
    },

    //画笔颜色
    set_pan_color: function set_pan_color(color) {
        this.color = cc.hexToColor(color);
    },

    //画板背景
    set_bg_image: function set_bg_image(sf) {
        this.bgImageView.spriteFrame = sf;
    },

    //菜单选中
    setMenuIndex: function setMenuIndex(t, index) {
        index = parseInt(index);

        var oV = this.menuBtns[this.menuIndex].node.getComponentsInChildren(cc.Sprite)[1];
        var ol = this.menuBtns[this.menuIndex].node.getComponentsInChildren(cc.Label)[0];

        oV.node.color = cc.hexToColor("753D32");
        ol.node.color = cc.hexToColor("FFFFFF");

        var v = this.menuBtns[index].node.getComponentsInChildren(cc.Sprite)[1];
        var l = this.menuBtns[index].node.getComponentsInChildren(cc.Label)[0];

        v.node.color = cc.hexToColor("FEF0C4");
        l.node.color = cc.hexToColor("753D32");

        this.menuIndex = index;

        switch (index) {
            case 0:
                Tool.onEvent('Finish');
                this.showShareView();
                this.showSubBtns(-1);
                break;
            case 1:
                Tool.onEvent('Brush');
                this.set_drawing_state(DrawingState.draw);
                this.showSubBtns(0);
                break;
            case 2:
                Tool.onEvent('Sticker');
                this.set_drawing_state(DrawingState.paper);
                this.showSubBtns(1);
                break;
            case 3:
                this.set_drawing_state(DrawingState.rubber);
                this.showSubBtns(-1);
                break;
            case 4:
                Tool.onEvent('Background');
                this.showSubBtns(2);
                break;
        }
    },

    showSubBtns: function showSubBtns(state) {
        this.subMenu.showSubBtns(state);
    },

    //分享页面
    showShareView: function showShareView() {

        var requestUrl = null;

        if (Tool.checkClient().isOtt) {
            requestUrl = Global.uri + '/zxottpad/achv/event';
        } else if (Tool.checkClient().isIOS || Tool.checkClient().isAndroid) {
            requestUrl = Global.uri + '/mgxbapp/achv/event';
        }

        if (requestUrl) {
            _request2.default.post(requestUrl, {
                'content-type': 'application/json'
            }, { 'event_type': 'drawing' });
        }

        this.rightView.active = false;
        this.backBtn.node.active = false;
        var self = this;

        setTimeout(function () {
            var locCanvas = self.rt._renderCmd._cacheCanvas;
            self.shareView.getComponent('ShareView').screenShot(function () {
                self.shareView.active = true;
                self.rightView.active = true;
                self.backBtn.node.active = true;
            });
        }, 100);
    },

    //back
    back: function back() {

        var isShow = cc.sys.localStorage.getItem('phoneDeskIsShow');

        if (isShow) {
            if (kf != null) {
                kf.close();
            }
        } else {
            cc.sys.localStorage.setItem('phoneDeskIsShow', 'true');
            this.phoneDesk.active = true;
        }
    },

    //添加桌面图标
    phoneDeskClick: function phoneDeskClick(t, index) {

        if (index == 0) {
            if (kf != null) {
                kf.close();
            }
        } else if (index == 1 || index == 2) {

            if (index == 1) {
                Tool.onEvent('Back_Desk');
            } else {
                Tool.onEvent('Desk');
            }

            this.phoneDesk.active = false;
            if (kf != null) {
                if (Tool.checkClient().isIOS) {
                    kf.addShortcut('https://static.xingbook.com/shortcut.html?icon=https://xb-3sc.xingbook.com/xb-3sc/icon.png&title=%e7%94%bb%e6%9d%bf&scheme=xbmg%3a%2f%2ffullScreenWeb%3flandscape%3dtrue%26url%3dhttps%3a%2f%2fgo.xingbook.com%2fdoV%3fchannel%3dshortcut');
                } else if (Tool.checkClient().isAndroid) {
                    kf.addShortcut(JSON.stringify({
                        'image': 'https://xb-3sc.xingbook.com/xb-3sc/icon.png',
                        'name': '画板',
                        'url': 'xbmg://fullScreenWeb?landscape=true&url=https://go.xingbook.com/doV?channel=shortcut'
                    }));
                }
            }
        }
    },

    //清空
    revokePath: function revokePath() {
        this.rt.clear(0, 0, 0, 0);
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {}

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
        //# sourceMappingURL=HomeUI.js.map
        