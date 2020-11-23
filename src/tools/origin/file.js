"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var lastElement_1 = require("../lastElement");
var index_1 = require("../make/index");
var File = /** @class */ (function () {
    // read = this._read
    function File(root) {
        this.root = "";
        this.name = "";
        this.type = "file";
        this.make = index_1.default;
        this.root = root;
        this.name = lastElement_1.default(root.split("\\"));
    }
    File.prototype.read = function () {
        return fs.readFileSync(this.root, { encoding: "utf8" }).split("\n");
    };
    return File;
}());
exports.default = File;
