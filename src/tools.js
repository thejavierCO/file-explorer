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
exports.dirObject = exports.fileObject = exports.dirModel = exports.fileModel = exports.ObjectType = exports.fragmanetRoot = exports.isRoot = exports.toRoot = exports.existRoot = exports.getRoot = exports.lastItem = exports.getTypeElement = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
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
function getRoot(...root) {
    return toRoot(root);
}
exports.getRoot = getRoot;
function existRoot(...root) {
    return fs.existsSync(getRoot(root.join("\\")));
}
exports.existRoot = existRoot;
function toRoot(element) {
    if (typeof element === "string") {
        if (/\//g.test(element))
            return toRoot(element.split("/"));
        else if (/(\\)/g.test(element))
            return toRoot(element.split("\\"));
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
let fragmanetRootMethods = (result) => ({
    result: result,
    last: result[result.length - 1],
    first: result[0],
    filter: result.filter,
    remplaceLast: (name) => result.filter((_, b, c) => b !== c.length - 1).join("//") + name
});
function fragmanetRoot(element) {
    if (typeof element === "string") {
        if (/\//g.test(element))
            return fragmanetRoot(element.split("/"));
        else if (/(\\)/g.test(element))
            return fragmanetRoot(element.split("\\"));
        else
            throw { error: "not is root" };
    }
    else if (Array.isArray(element)) {
        return fragmanetRootMethods(element);
    }
    else {
        throw { error: "not fragment root" };
    }
}
exports.fragmanetRoot = fragmanetRoot;
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
    getExtension(name) { }
    getName(root) {
        if (isRoot(root)) {
            return {
                name: fragmanetRoot(root).last,
                extension: fragmanetRoot(root).last.split(".")[0]
            };
        }
        else
            throw { error: "not is root" };
    }
    read() { return this._content; }
    rename(newName) { return newName; }
    write(data) {
        if (typeof data === "string")
            return data.split("\n");
        else if (Array.isArray(data))
            return data;
        else
            return [new String(data)];
    }
    newRoot(root) {
        if (isRoot(root))
            return root;
        else
            throw { error: "not is root" };
    }
    writeLast(...data) {
        data.map(e => this._content.push(e));
        return this.content;
    }
    get extension() {
        return this._extencion;
    }
    set extension(a) {
        console.log(a);
        this._extencion = this.getName(a).extension;
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
        return this.getName(this.root).name;
    }
    set name(a) {
        if (!a)
            throw { error: "not defined name" };
        this.root = fragmanetRoot(this.root).remplaceLast(a);
        this.extension = this.root;
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
        this.name = fragmanetRoot(this.root).last;
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