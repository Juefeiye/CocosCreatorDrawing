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
        bgView : cc.Node,
        click: cc.Node,
        colorID : 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad : function () {

        var self = this

        this.node.on('touchend', function () {
            self.teamPanel.selectColor(self.colorID);
        }, this);

    },

    updateColor : function(teamPanel,color,colorID) {
        this.color = color;
        this.colorID = colorID;
        this.teamPanel = teamPanel;
        this.bgView.color = cc.hexToColor(color);
    },

    showClick : function () {
        this.click.active = true;
    },

    hideClick : function () {
        this.click.active = false;
    }

});
