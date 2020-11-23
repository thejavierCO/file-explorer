"use strict";
exports.__esModule = true;
var path = require("path");
var lastElement_1 = require("../lastElement");
var fileBase = /** @class */ (function () {
    function fileBase(root) {
        var _this = this;
        if (root === void 0) { root = ""; }
        root = path.join(root);
        this.name = lastElement_1["default"](root.split("\\"));
        this.type = "file";
        this._content = "";
        this.read = function () { return _this._content; };
    }
    return fileBase;
}());
exports["default"] = fileBase;
