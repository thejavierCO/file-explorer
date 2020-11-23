"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var path_1 = require("path");
var fs_1 = require("fs");
var lastElement_1 = require("../lastElement");
var is_1 = require("../is");
var Dir = /** @class */ (function () {
    function Dir(root, manager) {
        var _this = this;
        this.type = "";
        this._root = "";
        this.name = "";
        this.type = "dir";
        this._root = root;
        this.name = lastElement_1["default"](root.split("\\"));
        this.set = function (name) { return name ? (is_1["default"](name) === "function" ?
            name(_this)
            : !fs_1["default"].existsSync(path_1["default"].resolve(_this._root, name)) ?
                (function (a) {
                    fs_1["default"].mkdirSync(a);
                    return new manager(a);
                })(path_1["default"].resolve(_this._root, name))
                : (function (a) {
                    throw { error: "exist directory", path: a };
                })(path_1["default"].resolve(_this._root, name))) : ((function (a) {
            throw { error: "not defined name", path: a };
        })(path_1["default"].resolve(_this._root))); };
        this.get = function (name) { return name ? (is_1["default"](name) === "function" ?
            name(_this)
            : fs_1["default"].existsSync(path_1["default"].resolve(_this._root, name)) ?
                (function (a) {
                    return new manager(a);
                })(path_1["default"].resolve(_this._root, name)) :
                (function (a) {
                    throw { error: "not exist directory", path: a };
                })(path_1["default"].resolve(_this._root, name))) : ((function (a) {
            throw { error: "not defined name", path: a };
        })(path_1["default"].resolve(_this._root))); };
        this.del = function (name) { return name ? (fs_1["default"].existsSync(path_1["default"].resolve(_this._root, name)) ?
            fs_1["default"].rmdirSync(path_1["default"].resolve(_this._root, name)) :
            (function (a) {
                throw { error: "not exist directory", path: a };
            })(path_1["default"].resolve(_this._root, name))) : (fs_1["default"].existsSync(path_1["default"].resolve(_this._root)) ?
            fs_1["default"].rmdirSync(path_1["default"].resolve(_this._root)) :
            (function (a) {
                throw { error: "not exist directory", path: a };
            })(path_1["default"].resolve(_this._root))); };
        this.read = function (name) { return name ? ((function (a) { return fs_1["default"].readdirSync(a).map(function (e) { return (__assign({}, new manager(path_1["default"].resolve(a, e)))); }); })(path_1["default"].resolve(_this._root, name))) : ((function (a) { return fs_1["default"].readdirSync(a).map(function (e) { return (__assign({}, new manager(path_1["default"].resolve(a, e)))); }); })(path_1["default"].resolve(_this._root))); };
        this.add = function (element) {
            if (is_1["default"](element) === "object") {
                var type = element.type, name_1 = element.name;
                switch (type) {
                    case "file":
                        // return fse.moveSync(path.resolve(_root),path.resolve(root))
                        break;
                    case "dir":
                        if (!fs_1["default"].existsSync(element.root)) {
                            _this.set(name_1).set(function (a) {
                                element.read().map(function (e) {
                                    a.add(e);
                                });
                            });
                        }
                        else {
                            _this.get(name_1).set(function (a) {
                                element.read().map(function (e) {
                                    a.add(e);
                                });
                            });
                        }
                        break;
                }
                return _this;
            }
            else {
                throw { error: "require elements by make" };
            }
        };
        this.filter = function (condicion, name) { return _this.read(name).filter(condicion); };
    }
    Object.defineProperty(Dir.prototype, "root", {
        get: function () {
            return this._root;
        },
        set: function (a) {
            this._root = a;
        },
        enumerable: false,
        configurable: true
    });
    return Dir;
}());
exports["default"] = Dir;
