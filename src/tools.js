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
exports.dirObject = exports.fileObject = exports.dirFactory = exports.fileFactory = exports.ObjectType = exports.rootSplit = exports.toRoot = exports.lastItem = exports.getTypeElement = exports.existRoot = exports.getRoot = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const create_1 = require("./create");
const explorer_1 = require("./explorer");
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
class fileFactory {
    constructor(root = "") {
        this._root = "";
        this._name = "";
        this.type = "file";
        this._root = getRoot(root);
        this._name = lastItem(rootSplit(this._root));
        this.extension = this.getExtension();
        this._content = [];
    }
    getExtension() {
        let get = this.name.split(".");
        if (get.length > 1) {
            return get[get.length - 1];
        }
        else {
            return undefined;
        }
    }
    read() {
        return this._content;
    }
    writeLast(data) {
        data.map(e => {
            this.content.push(e);
        });
        return this.content;
    }
    rename(newName) {
        return newName;
    }
    write(data) {
        return data;
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
        this._root = a;
    }
    get name() {
        return this._name;
    }
    set name(a) {
        this._name = this.rename(a);
    }
}
exports.fileFactory = fileFactory;
class dirFactory {
    constructor(root) {
        this._root = "";
        this._name = "";
        this.type = "dir";
        this.root = getRoot(root);
        this.name = lastItem(rootSplit(this.root));
        this._content = [];
    }
    read() { return this._content; }
    add(data) {
        return data;
    }
    rename(newName) {
        return newName;
    }
    del(name) {
        console.log(this.existElement(name));
    }
    get(name) {
        if (existRoot(getRoot(this.root, name))) {
            this.content.push(new explorer_1.explorer(getRoot(this.root, name)));
        }
        else {
            this.content.push(new create_1.create(getRoot(this.root, name)));
        }
    }
    set(name) {
        if (!existRoot(getRoot(this.root, name))) {
            this.content.push(new explorer_1.explorer(getRoot(this.root, name)));
        }
        else {
            this.content.push(new create_1.create(getRoot(this.root, name)));
        }
    }
    existElement(name) {
        let get = this.content.filter((e) => e.name === name);
        if (get.length > 1) {
            return true;
        }
        else {
            return false;
        }
    }
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
exports.dirFactory = dirFactory;
class fileObject extends fileFactory {
    constructor(root) {
        super(root);
        this.isExist = false;
        this.isExist = existRoot(root);
    }
    read() {
        if (this.isExist)
            return fs.readFileSync(this.root).toString().split("\n");
        else
            return this._content;
    }
    writeLast(data) {
        let content = data;
        if (typeof data === "string")
            content = data.split("\n");
        content = this.content.concat(content).join("\n");
        return this.content = [content];
    }
    rename(newName) {
        if (this.isExist) {
            let newRoot = this.root.replace(this.name, newName);
            fs.renameSync(this.root, newRoot);
            this._name = newName;
            this._root = this._root;
            return newName;
        }
        else
            return newName;
    }
    write(data) {
        let content = Array.isArray(data) ? data.join("\n") : data;
        if (this.isExist) {
            fs.writeFileSync(this.root, content);
            return this.read();
        }
        else
            return data;
    }
}
exports.fileObject = fileObject;
class dirObject extends dirFactory {
    constructor(root) {
        super(root);
        this.isExist = false;
        this.isExist = existRoot(root);
    }
    read() {
        if (this.isExist) {
            return fs.readdirSync(this.root)
                .map((e) => new explorer_1.explorer(e));
        }
        else {
            return this._content.map((e) => new create_1.create(e.root));
        }
    }
    del(name) {
        console.log(this.existElement(name));
    }
    get(name) {
        console.log(this.existElement(name));
    }
    set(name) {
        console.log(this.existElement(name));
    }
    add(data) {
        return data;
    }
    rename(newName) {
        if (this.isExist) {
            let newRoot = this.root.replace(this.name, newName);
            fs.renameSync(this.root, newRoot);
            this._name = newName;
            this._root = this._root;
            return newName;
        }
        else
            return newName;
    }
}
exports.dirObject = dirObject;
//# sourceMappingURL=tools.js.map