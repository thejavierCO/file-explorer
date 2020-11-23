"use strict";
exports.__esModule = true;
var path = require("path");
var fs = require("fs");
var file_1 = require("./tools/origin/file");
var dir_1 = require("./tools/origin/dir");
var is_1 = require("./tools/is");
var lastElement_1 = require("./tools/lastElement");
var index_1 = require("./tools/make/index");
var fileBrowser = /** @class */ (function () {
    function fileBrowser(root) {
        if (root === void 0) { root = path.resolve("./"); }
        root = path.resolve(is_1["default"](root, false) === "string" ? root : "./");
        if (fs.existsSync(path.resolve(typeof root === "string" ? root : "./"))) {
            if (is_1["default"](lastElement_1["default"](root.split("\\"))) === "file") {
                this.setMethods(new file_1["default"](root, fileBrowser));
            }
            else if (is_1["default"](lastElement_1["default"](root.split("\\"))) === "dir") {
                this.setMethods(new dir_1["default"](root, fileBrowser));
            }
            this.make = function (name) { return new index_1["default"](name, root); };
        }
        else {
            throw { error: "not exist root " + path.resolve(root ? root : "./") };
        }
    }
    fileBrowser.prototype.setMethods = function (a) {
        if (typeof a === "object" && a.length < 0)
            throw { error: "require object keys" };
        for (var name_1 in a) {
            if (a.hasOwnProperty(name_1)) {
                var e = a[name_1];
                // this[]
            }
        }
    };
    return fileBrowser;
}());
module.exports = fileBrowser;
