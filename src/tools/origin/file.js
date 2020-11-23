"use strict";
exports.__esModule = true;
var path = require("path");
var fs = require("fs");
var lastElement_1 = require("../lastElement");
var File = /** @class */ (function () {
    function File(root, manager) {
        var _this = this;
        this.type = "file";
        this._root = root;
        this.name = lastElement_1["default"](root.split("\\"));
        this.read = function (options) { return fs.readFileSync(path.resolve(_this._root), options); };
    }
    return File;
}());
exports["default"] = File;
