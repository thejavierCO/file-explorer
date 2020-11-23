"use strict";
exports.__esModule = true;
var file_1 = require("./file");
var dir_1 = require("./dir");
var is_1 = require("../is");
var make = /** @class */ (function () {
    function make(type, name, root) {
        switch (type) {
            case "file":
                root = root + "/" + name;
                return new file_1["default"](root);
            case "dir":
                root = root + "/" + name;
                return new dir_1["default"](root);
            default:
                if (is_1["default"](type) === "file") {
                    return new make("file", type, name);
                }
                else if (is_1["default"](type) === "dir") {
                    return new make("dir", type, name);
                }
        }
    }
    return make;
}());
exports["default"] = make;
