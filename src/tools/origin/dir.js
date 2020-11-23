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
var path = require("path");
var fs = require("fs");
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
            : !fs.existsSync(path.resolve(_this._root, name)) ?
                (function (a) {
                    fs.mkdirSync(a);
                    return new manager(a);
                })(path.resolve(_this._root, name))
                : (function (a) {
                    throw { error: "exist directory", path: a };
                })(path.resolve(_this._root, name))) : ((function (a) {
            throw { error: "not defined name", path: a };
        })(path.resolve(_this._root))); };
        this.get = function (name) { return name ? (is_1["default"](name) === "function" ?
            name(_this)
            : fs.existsSync(path.resolve(_this._root, name)) ?
                (function (a) {
                    return new manager(a);
                })(path.resolve(_this._root, name)) :
                (function (a) {
                    throw { error: "not exist directory", path: a };
                })(path.resolve(_this._root, name))) : ((function (a) {
            throw { error: "not defined name", path: a };
        })(path.resolve(_this._root))); };
        this.del = function (name) { return name ? (fs.existsSync(path.resolve(_this._root, name)) ?
            fs.rmdirSync(path.resolve(_this._root, name)) :
            (function (a) {
                throw { error: "not exist directory", path: a };
            })(path.resolve(_this._root, name))) : (fs.existsSync(path.resolve(_this._root)) ?
            fs.rmdirSync(path.resolve(_this._root)) :
            (function (a) {
                throw { error: "not exist directory", path: a };
            })(path.resolve(_this._root))); };
        this.read = function (name) { return name ? ((function (a) { return fs.readdirSync(a).map(function (e) { return (__assign({}, new manager(path.resolve(a, e)))); }); })(path.resolve(_this._root, name))) : ((function (a) { return fs.readdirSync(a).map(function (e) { return (__assign({}, new manager(path.resolve(a, e)))); }); })(path.resolve(_this._root))); };
        this.add = function (element) {
            if (is_1["default"](element) === "object") {
                var type = element.type, name_1 = element.name;
                switch (type) {
                    case "file":
                        // return fse.moveSync(path.resolve(_root),path.resolve(root))
                        break;
                    case "dir":
                        if (!fs.existsSync(element.root)) {
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
    return Dir;
}());
exports["default"] = Dir;
