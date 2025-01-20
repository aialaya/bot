"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
var toast_vue_1 = require("./toast.vue");
var div = document.createElement("div");
div.setAttribute("class", "toast");
document.body.appendChild(div);
var time = null;
var toast = function (text, duration) {
    if (duration === void 0) { duration = 1500; }
    var NODE = (0, vue_1.createVNode)(toast_vue_1.default, { text: text });
    (0, vue_1.render)(NODE, div);
    clearTimeout(time);
    time = setTimeout(function () {
        (0, vue_1.render)(null, div);
    }, duration);
};
exports.default = toast;
