"use strict";
exports.__esModule = true;
var path_1 = require("path");
var fs_1 = require("fs");
var file_1 = require("./tools/origin/file");
var dir_1 = require("./tools/origin/dir");
var is_1 = require("./tools/is");
var lastElement_1 = require("./tools/lastElement");
var index_1 = require("./tools/make/index");
var fileBrowser = /** @class */ (function () {
    function fileBrowser(root) {
        if (root === void 0) { root = path_1["default"].resolve("./"); }
        root = path_1["default"].resolve(is_1["default"](root, false) === "string" ? root : "./");
        if (fs_1["default"].existsSync(path_1["default"].resolve(typeof root === "string" ? root : "./"))) {
            if (is_1["default"](lastElement_1["default"](root.split("\\"))) === "file") {
                this.Methods = new file_1["default"](root, fileBrowser);
            }
            else if (is_1["default"](lastElement_1["default"](root.split("\\"))) === "dir") {
                this.Methods = new dir_1["default"](root, fileBrowser);
            }
            this.make = function (name) { return new index_1["default"](name, root); };
        }
        else {
            throw { error: "not exist root " + path_1["default"].resolve(root ? root : "./") };
        }
    }
    Object.defineProperty(fileBrowser.prototype, "Methods", {
        set: function (a) {
            if (typeof a === "object" && a.length < 0)
                throw { error: "require object keys" };
            for (var name_1 in a) {
                if (a.hasOwnProperty(name_1)) {
                    var e = a[name_1];
                    this[name_1] = e;
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    return fileBrowser;
}());
module.exports = fileBrowser;
