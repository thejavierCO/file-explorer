"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObjectType = exports.otherObject = exports.dirObject = exports.fileObject = exports.is = exports.getLast = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var explorer_1 = __importDefault(require("./explorer"));
var rgxfilter = /[.]/i;
function getLast(array) {
    return array[array.length - 1];
}
exports.getLast = getLast;
function isDir(a) {
    if (!rgxfilter.test(a)) {
        return true;
    }
    else {
        return false;
    }
}
function isFile(a) {
    if (rgxfilter.test(a)) {
        return true;
    }
    else {
        return false;
    }
}
function is(name) {
    if (isDir(name)) {
        return "dir";
    }
    else if (isFile(name)) {
        return "file";
    }
    else {
        return "other";
    }
}
exports.is = is;
var fileObject = /** @class */ (function () {
    function fileObject(root) {
        var _this = this;
        this.root = "";
        this.name = "";
        this.type = "file";
        this.extencion = "";
        this.content = "";
        this.set = function (name) { };
        this.get = function (name) { };
        this.del = function (name) { };
        this.add = function (model) { };
        this.read = function () { return fs_1.default.readFileSync(_this.root, { encoding: "utf8" }); };
        this.root = root;
        this.name = getLast(root.split("\\"));
    }
    return fileObject;
}());
exports.fileObject = fileObject;
var dirObject = /** @class */ (function () {
    function dirObject(root) {
        var _this = this;
        this.root = "";
        this.name = "";
        this.type = "dir";
        this.content = [];
        this.set = function (name) {
            if (typeof name === "string") {
                if (!fs_1.default.existsSync(path_1.default.resolve(_this.root, name))) {
                    fs_1.default.mkdirSync(path_1.default.resolve(_this.root, name));
                    return new explorer_1.default(path_1.default.resolve(_this.root, name));
                }
                else {
                    throw new Error("exist directory in:\n" + path_1.default.resolve(_this.root, name));
                }
            }
            else if (typeof name === "function") {
                name(_this);
            }
            else {
                throw new Error("require string and function");
            }
        };
        this.get = function (name) {
            if (typeof name === "string") {
                if (fs_1.default.existsSync(path_1.default.resolve(_this.root, name))) {
                    return new explorer_1.default(path_1.default.resolve(_this.root, name));
                }
                else {
                    throw new Error("exist directory in:\n" + path_1.default.resolve(_this.root, name));
                }
            }
            else {
                throw new Error("require string and function");
            }
        };
        this.del = function (name) {
            if (!name && typeof name === "string") {
                fs_1.default.rmdirSync(path_1.default.resolve(_this.root, name));
                return {
                    root: _this.root,
                    status: true,
                    message: "test"
                };
            }
            else {
                fs_1.default.rmdirSync(path_1.default.resolve(_this.root));
                return {
                    root: _this.root,
                    status: true,
                    message: "test"
                };
            }
        };
        this.add = function (model) {
        };
        this.read = function (name) {
            return fs_1.default.readdirSync(path_1.default.resolve(_this.root, name ? name : ""))
                .map(function (subname) { return new explorer_1.default(path_1.default.resolve(_this.root, name ? name : "", subname)); });
        };
        this.root = root;
        this.name = getLast(root.split("\\"));
    }
    return dirObject;
}());
exports.dirObject = dirObject;
var otherObject = /** @class */ (function () {
    function otherObject(root) {
        this.root = "";
        this.name = "";
        this.type = "other";
        this.root = root;
        this.name = getLast(root.split("\\"));
    }
    return otherObject;
}());
exports.otherObject = otherObject;
function getObjectType(root) {
    var name = getLast(root.split("\\"));
    if (is(name) === "file") {
        return new fileObject(root);
    }
    else if (is(name) === "dir") {
        return new dirObject(root);
    }
    else {
        return new otherObject(root);
    }
}
exports.getObjectType = getObjectType;
