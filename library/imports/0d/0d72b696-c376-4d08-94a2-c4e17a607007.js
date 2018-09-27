"use strict";
cc._RF.push(module, '0d72baWw3ZNCJSixOF6YHAH', 'request');
// scripts/request.js

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function request(method) {
    // const app = JSON.parse(kf.getHeadParams())
    var app = null;
    if ((typeof kf === 'undefined' ? 'undefined' : _typeof(kf)) === 'object') {
        app = JSON.parse(kf.getHeadParams());
    } else {
        app = {
            imei: ''
            // imei: 'b6cd800a-8c39-3547-a752-061e7b5ac784'
        };
    }
    return function (url) {
        var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var data = arguments[2];

        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status === 200) {
                        var response = xhr.responseText;
                        var res = JSON.parse(response);
                        if (res.resultCode === 0) {
                            resolve(res);
                        } else {
                            reject(res.resultMsg);
                        }
                    } else {
                        reject(xhr.responseText);
                    }
                }
            };
            xhr.open(method, url, true);
            xhr.setRequestHeader('imei', app.imei);
            var keys = Object.getOwnPropertyNames(headers);
            keys.forEach(function (key) {
                xhr.setRequestHeader(key, headers[key]);
            });

            if (data) {
                xhr.send(JSON.stringify(data));
            } else {
                xhr.send();
            }
        });
    };
}

exports.default = {
    get: request('GET'),
    post: request('POST')
};
module.exports = exports['default'];

cc._RF.pop();