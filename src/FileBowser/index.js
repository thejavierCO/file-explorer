"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
var file_1 = require("../tools/origin/file");
var dir_1 = require("../tools/origin/dir");
var is_1 = require("../tools/is");
var lastElement_1 = require("../tools/lastElement");
var fileBrowser = /** @class */ (function () {
    function fileBrowser(root) {
        if (root === void 0) { root = path.resolve("./"); }
        root = path.resolve(is_1.default(root, false) === "string" ? root : "./");
        if (fs.existsSync(path.resolve(typeof root === "string" ? root : "./"))) {
            if (is_1.default(lastElement_1.default(root.split("\\"))) === "file") {
                return new file_1.default(root);
            }
            else if (is_1.default(lastElement_1.default(root.split("\\"))) === "dir") {
                return new dir_1.default(root);
            }
        }
        else {
            throw { error: "not exist root " + path.resolve(root ? root : "./") };
        }
    }
    return fileBrowser;
}());
exports.default = fileBrowser;
