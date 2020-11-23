"use strict";
exports.__esModule = true;
var path_1 = require("path");
var lastElement_1 = require("../lastElement");
var fs_1 = require("fs");
var File = /** @class */ (function () {
    function File(root, manager) {
        var _this = this;
        this.type = "file";
        this._root = root;
        this.name = lastElement_1["default"](root.split("\\"));
        this.read = function (options) { return fs_1["default"].readFileSync(path_1["default"].resolve(_this._root), options); };
    }
    Object.defineProperty(File.prototype, "root", {
        get: function () {
            return this._root;
        },
        enumerable: false,
        configurable: true
    });
    return File;
}());
exports["default"] = File;
