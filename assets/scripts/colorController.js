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
        home : {
            default: null,
            type: cc.Node
        },

        colorPrefab : cc.Prefab,

        colors: {
            default: [],
            type: cc.String
        },

        audios:{
            default: [],
            url: [cc.AudioClip]
        },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {

        this.items = [];
        this.selectIndex = 0;
        this.canvas = this.home.getComponent('HomeUI')
        for (var i = 0; i < this.colors.length; ++i) {
            var item = cc.instantiate(this.colorPrefab);
            var color = this.colors[i];
            this.node.addChild(item);
            item.getComponent('colors').updateColor(this,color,i)
            this.items.push(item)
        }

        this.isFirst = true
        this.selectColor(0);

    },

    selectColor: function (index) {

        if (!this.isFirst) {
            Tool.play(this.audios[index]);        
        }
        
        this.isFirst = false

        var orginItem = this.items[this.selectIndex].getComponent('colors');
        orginItem.hideClick();

        this.selectIndex = index;

        var selectedItem = this.items[this.selectIndex].getComponent('colors');
        selectedItem.showClick();

        this.canvas.set_pan_color(this.colors[index])

        Tool.onEvent('Brush', this.colors[index]);

        

    }

});
