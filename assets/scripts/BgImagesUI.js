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
        bgImagesAnim: cc.Animation,
        btnShowSub: cc.Button,
        btnHideSub: cc.Button,
        colorContainer : cc.Node,
        imagesContainer : cc.Node
    },

    // use this for initialization
    onLoad: function () {
        this.btnShowSub.node.active = true;
        this.btnHideSub.node.active = false;
    },

    showSubBtns: function () {
        this.btnContainer.active = true;
        this.bgImagesAnim.play('bg_images_pop');
    },

    hideSubBtns: function () {
        this.bgImagesAnim.play('bg_images_fold');
    },

    onButtonClick : function () {
        if (this.btnContainer.active == true) {
            hideSubBtns()
        }else{
            showSubBtns()
        }
    },


    onFinishBgAnim: function (finishFold) {
        this.btnShowSub.node.active = finishFold;
        this.btnHideSub.node.active = !finishFold;
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
