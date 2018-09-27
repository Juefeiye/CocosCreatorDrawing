"use strict";
cc._RF.push(module, '8a164ux4adHuL0EKmUODl3J', 'Screenshot');
// scripts/Screenshot.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {},


    /**
     * 适用于win android ios
     * @param {*} fileName 
     * @param {*} type 
     * @param {*} callback 
     */
    screenshotNative: function screenshotNative() {
        var fileName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'shot.png';
        var type = arguments[1];
        var callback = arguments[2];

        var size = cc.director.getWinSize();
        var fullPath = jsb.fileUtils.getWritablePath() + fileName;
        console.log('fullPath=', fullPath);
        if (jsb.fileUtils.isFileExist(fullPath)) {
            console.log('remove');
            jsb.fileUtils.removeFile(fullPath);
        }

        var w = Math.floor(size.width) / 1920 * 1640;

        //方式1
        var texture = new cc.RenderTexture(Math.floor(w), Math.floor(size.height));
        //方式2
        if (type == 'high') {
            //如果要图片高质量 可以使用cc.Texture2D.PIXEL_FORMAT_RGBA8888。
            texture = new cc.RenderTexture(Math.floor(size.width), Math.floor(size.height), cc.Texture2D.PIXEL_FORMAT_RGBA4444, gl.DEPTH24_STENCIL8_OES);
        }
        texture.setPosition(cc.p(w / 2, size.height / 2));
        texture.begin();
        cc.director.getRunningScene().visit();
        texture.end();
        //1.4 之前请用cc.IMAGE_FORMAT_JPG。1.4以后，截屏函数的第二个参数改成了 cc.ImageFormat.PNG
        texture.saveToFile(fileName, cc.ImageFormat.PNG);
        this.loadImg(fullPath, callback);
    },


    /**
     * 适用于WebGL 与Canvas环境
     * @param {*} callback 
     */
    screenshotWebGL: function screenshotWebGL(callback) {
        var self = this;
        cc.director.on(cc.Director.EVENT_AFTER_DRAW, function () {
            var canvas = document.getElementById("GameCanvas");
            // var base64 = canvas.toDataURL("imagea/png");

            function grab(x, y, width, height) {
                var arrayBuffer = new Uint8Array(width * height * 4);

                cc.game._renderContext.readPixels(x, y, width, height, cc.game._renderContext.RGBA, cc.game._renderContext.UNSIGNED_BYTE, arrayBuffer);

                var newBuffer = new Uint8Array(width * height * 4);
                for (var i = height - 1; i >= 0; i--) {
                    for (var j = 0; j < width; j++) {
                        for (var k = 0; k < 4; k++) {
                            newBuffer[((height - 1 - i) * width + j) * 4 + k] = arrayBuffer[(i * width + j) * 4 + k];
                        }
                    }
                }

                var clampArray = new Uint8ClampedArray(newBuffer, 0, newBuffer.length);
                var imageData = new ImageData(clampArray, width, height);

                var tempCanvas = document.createElement('canvas');
                tempCanvas.width = width;
                tempCanvas.height = height;
                tempCanvas.getContext('2d').putImageData(imageData, 0, 0);

                var newBase64 = tempCanvas.toDataURL("imagea/png");

                self.base64ToSpriteFrame(newBase64, function (frame) {
                    if (callback) callback(newBase64, frame);
                });
                cc.director.off(cc.Director.EVENT_AFTER_DRAW);
            }

            var w = Math.floor(canvas.width / 1920 * 1640);
            grab(0, 0, w, canvas.height);
        });
    },


    /**
     * 只适用Canvas环境
     * @param {*} callback 
     */
    screenshotCanvas: function screenshotCanvas(callback) {

        var canvas = document.getElementById("GameCanvas");
        var w = Math.floor(canvas.width / 1920 * 1640);
        var imageData = canvas.getContext('2d').getImageData(0, 0, w, canvas.height);
        var tempCanvas = document.createElement('canvas');
        tempCanvas.width = w;
        tempCanvas.height = canvas.height;
        tempCanvas.getContext('2d').putImageData(imageData, 0, 0);
        var base64 = tempCanvas.toDataURL("imagea/png");

        var frame = this.base64ToSpriteFrame(base64, function (frame) {
            if (callback) callback(base64, frame);
        });
        //把图片生成后download到本地
        // var href = base64.replace(/^data:image[^;]*/, "data:image/octet-stream");
        // document.location.href = href;
    },


    /**
     * 切图
     * @param { cc.SpriteFrame or cc.Texture2D} data 
     * @param {*} rect 
     */
    cutPicture: function cutPicture(data, rect) {
        var frame = void 0;
        if (data instanceof cc.SpriteFrame) {
            frame = data;
        } else if (data instanceof cc.Texture2D) {
            frame = new cc.SpriteFrame(texture);
        }
        if (!frame) {
            return null;
        }
        //设置显示区域 ，注意使用cc.Rect()会得到undefinde 
        frame.setRect(rect);
        return frame;
    },
    base64ToSpriteFrame: function base64ToSpriteFrame(base64, callback) {
        var img = new Image();
        img.src = base64;
        img.onload = function () {
            var texture = new cc.Texture2D();
            texture.initWithElement(img);
            texture.handleLoadedTexture();
            var newframe = new cc.SpriteFrame(texture);
            if (callback) callback(newframe);
        };
    },
    loadImg: function loadImg(fullPath, callback) {
        //延时就因为，texture.begin()是到是下一帧才截图完成
        this.scheduleOnce(function () {
            cc.loader.load(fullPath, function (err, tex) {
                var spriteFrame = new cc.SpriteFrame(tex, cc.Rect(0, 0, tex.width, tex.height));
                if (callback) callback(spriteFrame);
            });
        }, 0.01);
    }
}

// update (dt) {},
);

cc._RF.pop();