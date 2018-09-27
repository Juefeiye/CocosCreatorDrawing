// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html


var paperModel = require("Model");

cc.Class({
    extends: cc.Component,

    properties: {
        paperPrefab : cc.Prefab,
        loadView : cc.Node,
        audios:{
            default: [],
            url: [cc.AudioClip]
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.items = [];
        this.resources = []
        this.loadDragonBones();
        this.loadPaperFrames();

    },


    //加载资源
    loadDragonBones () {
        var self = this;
        cc.loader.loadResDir('dragonBones', function(err, assets){
            if(err){
                return;
            }
            if(assets.length <= 0){
                return;
            }
            var names = [];        
            var resAssets = [];
            var resAtlasAssets = [];
            var paperFrames = [];

            for(var i in assets){
                let asset = assets[i] ;
                if(asset instanceof cc.SpriteFrame){
                    if (asset.name.lastIndexOf("_tex") == -1){
                        paperFrames.push(asset)
                    }
                }
                if(asset instanceof dragonBones.DragonBonesAsset){
                    let name = asset.name
                    names.push(name.substr(0,name.lastIndexOf("_ske")));//_ske
                    resAssets.push(asset);
                }
                if(asset instanceof dragonBones.DragonBonesAtlasAsset){
                    resAtlasAssets.push(asset);
                }
            }
            for(var i in names){
                var resource = new paperModel()
                resource.name = names[i];
                resource.asset = resAssets[i];
                resource.atlasAsset = resAtlasAssets[i];
                resource.paperFrame = paperFrames[i];
                resource.spriteFrame = null;
                self.resources.push(resource);
            }
        });
    },

    loadPaperFrames (){
        var self = this;
        cc.loader.loadResDir('papers', function(err, assets){
            if(err){
                return;
            }
            if(assets.length <= 0){
                return;
            }

            var names = [];
            var paperFrames = [];
            var spriteFrames = [];

            for(var i in assets){
                let asset = assets[i] ;
                if(asset instanceof cc.SpriteFrame){
                    let name = asset.name
                    if (asset.name.lastIndexOf("_01") > 0){
                        names.push(name.substr(0,name.lastIndexOf("_01")));
                        spriteFrames.push(asset);
                    }else if (asset.name.lastIndexOf("_02") > 0){
                        paperFrames.push(asset);
                    }
                }
            }

            for(var i in names){
                var resource = new paperModel()
                resource.name = names[i];
                resource.asset = null;
                resource.atlasAsset = null;
                resource.paperFrame = paperFrames[i];
                resource.spriteFrame = spriteFrames[i];
                self.resources.push(resource);
            }
        
            self.updateUI()

        });
    },


    updateUI () {

        for (var i in this.resources) {
            this.resources[i].url = this.audios[i];
            var item = cc.instantiate(this.paperPrefab);
            var sf = this.resources[i].paperFrame;
            this.node.addChild(item);
            item.getComponent('PaperPrefab').updateSpriteFrame(this,sf,i)
            this.items.push(item)
        }

        this.loadView.active = false
        var item = this.items[0].getComponent('PaperPrefab');
        item.showClick();
        Global.paperModel = this.resources[0];
        this.selectIndex = 0;
    },


    selectPaper: function (index) {

        Tool.play(this.audios[index]);

        var orginItem = this.items[this.selectIndex].getComponent('PaperPrefab');
        orginItem.hideClick();

        this.selectIndex = index;

        var selectedItem = this.items[this.selectIndex].getComponent('PaperPrefab');

        selectedItem.showClick();

        Global.paperModel = this.resources[this.selectIndex];

        Tool.onEvent('Sticker', this.resources[this.selectIndex].name);

    },


    start () {

    },

    // update (dt) {},
});
