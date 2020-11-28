"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dirObject = exports.fileObject = exports.dirModel = exports.fileModel = exports.ObjectType = exports.rootSplit = exports.isRoot = exports.toRoot = exports.lastItem = exports.getTypeElement = exports.existRoot = exports.getRoot = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
function getRoot(...root) {
    return toRoot(root);
}
exports.getRoot = getRoot;
function existRoot(...root) {
    return fs.existsSync(getRoot(root.join("\\")));
}
exports.existRoot = existRoot;
function getTypeElement(element) {
    if (!element)
        throw { error: "not defined root" };
    if (/[.]([\w\d]{0,})/i.test(element))
        return "file";
    else
        return "dir";
}
exports.getTypeElement = getTypeElement;
function lastItem(element) {
    if (Array.isArray(element))
        return element[element.length - 1];
    else
        throw { error: "require array" };
}
exports.lastItem = lastItem;
function toRoot(element) {
    if (typeof element === "string") {
        if (/\//g.test(element))
            return path.resolve(element.split("/").join("\\"));
        else if (/(\\)/g.test(element))
            return path.resolve(element.split("/").join("\\"));
        else
            throw { error: "not is root" };
    }
    else if (Array.isArray(element)) {
        return path.resolve(element.join("\\"));
    }
    else {
        throw { error: "not convert root" };
    }
}
exports.toRoot = toRoot;
function isRoot(element) {
    if (typeof element === "string") {
        if (/\//g.test(element))
            return true;
        else if (/(\\)/g.test(element))
            return true;
        else
            return false;
    }
    else if (Array.isArray(element)) {
        return isRoot(element.join("\\"));
    }
    else {
        return false;
    }
}
exports.isRoot = isRoot;
function rootSplit(element) {
    if (typeof element === "string") {
        if (/\//g.test(element))
            return element.split("/");
        else if (/(\\)/g.test(element))
            return element.split("\\");
        else
            throw { error: "not is root" };
    }
    else if (Array.isArray(element)) {
        return element;
    }
    else {
        throw { error: "not convert root" };
    }
}
exports.rootSplit = rootSplit;
function ObjectType(type, root) {
    if (!root)
        throw { error: "require root" };
    else if (!type)
        return undefined;
    else if (type === "dir")
        return new dirObject(root);
    else if (type === "file")
        return new fileObject(root);
}
exports.ObjectType = ObjectType;
;
class fileModel {
    constructor(root) {
        this._root = "";
        this.type = "file";
        if (!root)
            throw { error: "require root" };
        this.root = root;
        this.name = root;
        this.extension = root;
        this._content = [];
    }
    getExtension(name) {
        if (!name)
            name = this.root;
        let get = name.split(".");
        if (get.length > 1)
            return lastItem(get);
        else
            return undefined;
    }
    getName(root) {
        if (!root)
            return this.getName(this.root);
        if (typeof root === "string") {
            console.log(root);
            let name = lastItem(rootSplit(root));
            let extencion = name.split(".").filter((a, b, c) => b !== c.length - 1);
            if (extencion.length > 0) {
                name = extencion.join(".");
            }
            if (isRoot(name)) {
                return undefined;
            }
            return name;
        }
        else
            throw { error: "require string" };
    }
    read() { return this._content; }
    rename(newName) { return this.getName(getRoot(this._root, newName)); }
    write(data) {
        if (typeof data === "string")
            return data.split("\n");
        else if (Array.isArray(data))
            return data;
        else
            return [new String(data)];
    }
    writeLast(...data) {
        data.map(e => this.content.push(e));
        return this.content;
    }
    newRoot(root) {
        if (!root)
            return this.root;
        return root;
    }
    get extension() {
        return this._extencion;
    }
    set extension(a) {
        this._extencion = this.getExtension(a);
    }
    get content() {
        return this._content = this.read();
    }
    set content(data) {
        this._content = this.write(data);
    }
    get root() {
        return this._root;
    }
    set root(a) {
        this._root = getRoot(this.newRoot(a));
    }
    get name() {
        return this.getName(this._name);
    }
    set name(a) {
        if (!a)
            throw { error: "not defined name" };
        let base = this.root.split("\\").filter((_, b, c) => b !== c.length - 1);
        base.push(a);
        this.root = base.join("\\");
        this.extension = a;
        this._name = this.rename(a);
    }
}
exports.fileModel = fileModel;
class dirModel {
    constructor(root) {
        this._root = "";
        this._name = "";
        this.type = "dir";
        this.root = getRoot(root);
        this.name = lastItem(rootSplit(this.root));
        this._content = [];
    }
    read() { return this._content; }
    add(data) { return data; }
    rename(newName) { return newName; }
    get content() {
        return this.read();
    }
    set content(data) {
        this._content = this.add(data);
    }
    get root() {
        return this._root;
    }
    set root(a) {
        this._root = a;
    }
    get name() {
        return this._name;
    }
    set name(a) {
        this._name = this.rename(a);
    }
}
exports.dirModel = dirModel;
class fileObject extends fileModel {
    constructor(root) {
        super(root);
        this.isExist = false;
        this.isExist = existRoot(root);
    }
}
exports.fileObject = fileObject;
class dirObject extends dirModel {
    constructor(root) {
        super(root);
        this.isExist = false;
        this.isExist = existRoot(root);
    }
}
exports.dirObject = dirObject;
//# sourceMappingURL=tools.js.map