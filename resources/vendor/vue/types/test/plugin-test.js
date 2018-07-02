"use strict";
exports.__esModule = true;
var index_1 = require("../index");
var Option = /** @class */ (function () {
    function Option() {
        this.prefix = "";
        this.suffix = "";
    }
    return Option;
}());
var plugin = {
    install: function (Vue, option) {
        if (typeof option !== "undefined") {
            var prefix = option.prefix, suffix = option.suffix;
        }
    }
};
var installer = function (Vue, option) { };
index_1["default"].use(plugin, new Option);
index_1["default"].use(installer, new Option);
index_1["default"].use(installer, new Option, new Option, new Option);
