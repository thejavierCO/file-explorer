"use strict";
exports.__esModule = true;
var path = require("path");
var index_1 = require("./index");
var lastElement_1 = require("../lastElement");
var is_1 = require("../is");
var dirBase = /** @class */ (function () {
    function dirBase(root) {
        if (root === void 0) { root = ""; }
        root = path.join(root);
        this.name = lastElement_1["default"](root.split("\\"));
        this.root = path.join(root);
        this.type = "dir";
        this._content = [];
    }
    dirBase.prototype.set = function (name) {
        if (!name)
            throw { error: "not defined name" };
        if (is_1["default"](name, false) === "string") {
            var elem_1 = new index_1["default"](path.join(this.root, name));
            if (this.filter(function (e) { return e.name == elem_1.name && e.type == elem_1.type; }).length === 0) {
                elem_1.root = path.join(this.root, name);
                this._content.push(elem_1);
                return elem_1;
            }
            else {
                throw { error: "exist element" };
            }
        }
        else if (is_1["default"](name) === "function") {
            var data = name(this);
            if (is_1["default"](data) !== "undefined" && data !== "") {
                console.log(data);
            }
            return this;
        }
        else {
            throw { error: "require name string or more elements with function" };
        }
    };
    dirBase.prototype.get = function (name) {
        if (!name)
            throw { error: "not defined name" };
        var elem = new index_1["default"](name, path.join(this.root, name));
        if (this.filter(function (e) { return e.name == elem.name && e.type == elem.type; }).length === 1) {
            return elem;
        }
        else {
            throw { error: "not exist element" };
        }
    };
    dirBase.prototype.read = function (name) {
        if (!name)
            return this._content;
        var elem = new index_1["default"](name, path.join(this.root, name));
        if (this.filter(function (e) { return e.name == elem.name && e.type == elem.type; }).length === 1) {
            return this.filter(function (e) { return e.name == elem.name && e.type == elem.type; })[0];
        }
        else {
            throw { error: "not exist " + elem.type };
        }
    };
    dirBase.prototype.filter = function (condicion) {
        return this._content.filter(condicion);
    };
    return dirBase;
}());
exports["default"] = dirBase;
