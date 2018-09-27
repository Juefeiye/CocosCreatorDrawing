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
        imageView : cc.Sprite,
        imageID : 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad : function () {

        var self = this
        this.node.on('touchend', function () {
            self.teamPanel.selectImage(self.imageID);
        }, this);

    },

    updateSpriteFrame : function(teamPanel,spriteFrame,imageID) {

        this.imageID = imageID;
        this.teamPanel = teamPanel;
        this.imageView.spriteFrame = spriteFrame;
        
    },
});
