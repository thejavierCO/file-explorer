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
exports.dirObject = exports.fileObject = exports.dirModel = exports.fileModel = exports.Root = exports.ObjectType = exports.getTypeElement = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const create_1 = require("./create");
const explorer_1 = require("./explorer");
function getTypeElement(element) {
    if (!element)
        throw { error: "not defined root" };
    if (/[.]([\w\d]{0,})/i.test(element))
        return "file";
    else
        return "dir";
}
exports.getTypeElement = getTypeElement;
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
class Root {
    constructor(root) {
        this._root = "./";
        if (this.isRoot(root))
            this._root = this.setRoot(root);
        else if (this.isRoot("./" + root))
            this._root = this.setRoot("./" + root);
        else
            throw { error: "not is root", root };
    }
    isRoot(element) {
        if (typeof element === "string") {
            if (/\//g.test(element))
                return true;
            else if (/(\\)/g.test(element))
                return true;
            else
                return false;
        }
        else if (Array.isArray(element)) {
            return this.isRoot(element.join("\\"));
        }
        else {
            return false;
        }
    }
    getRoot(...root) { return this.setRoot(root); }
    ;
    existRoot(...root) { return fs.existsSync(this.getRoot(root.join("\\"))); }
    ;
    setRoot(element) {
        if (typeof element === "string") {
            if (/\//g.test(element))
                return this.setRoot(element.split("/"));
            else if (/(\\)/g.test(element))
                return this.setRoot(element.split("\\"));
            else
                throw { error: "not is root", root: element };
        }
        else if (Array.isArray(element)) {
            return path.resolve(element.join("\\"));
        }
        else {
            throw { error: "not convert root", data: element };
        }
    }
    toRoot(element) {
        if (typeof element === "string") {
            if (/\//g.test(element))
                return this.toRoot(element.split("/"));
            else if (/(\\)/g.test(element))
                return this.toRoot(element.split("\\"));
            else
                throw { error: "not is root" };
        }
        else if (Array.isArray(element)) {
            return element.join("\\");
        }
        else {
            throw { error: "not convert root" };
        }
    }
    remplace(posicion, element) {
        if (!element)
            throw { error: "not defined element to remplace" };
        if (posicion <= -1) {
            if (posicion < (0 - this.length))
                return this.remplace(this.length + 1, element);
            else
                return this.remplace(this.length - (0 - posicion), element);
        }
        else if (posicion > this.length) {
            throw { error: "not exist element" };
        }
        else
            return new Root(this.elements.map((a, b) => b === posicion ? element : a).join("\\"));
    }
    get(posicion) {
        return posicion <= -1 ?
            posicion < (0 - this.length) ? undefined : this.get(this.length - (0 - posicion))
            : this.elements[posicion];
    }
    push(name) {
        if (typeof name !== "string")
            throw { error: "require string for root" };
        const base = this.elements;
        base.push(name);
        this._root = base.join("\\");
        return this.root;
    }
    pop(posicion) {
        if (posicion)
            return this.filter((a, b, c) => b !== (posicion <= -1 ? (this.length - (0 - posicion)) : posicion));
        const base = this.elements;
        base.pop();
        this._root = base.join("\\");
        return this.root;
    }
    shift() {
        const base = this.elements;
        base.shift();
        this._root = base.join("\\");
        return this.root;
    }
    concat(elements) { return path.join(this.root || "", (this.isRoot(elements) ? this.toRoot(elements) : "")); }
    filter(condicion) { return this.elements.filter(condicion).join("\\"); }
    map(condicion) { return this.elements.map(condicion).join("\\"); }
    includes(element, fromIndex) { return this.elements.includes(element, fromIndex); }
    slice(start, end) { return this.elements.slice(start, end); }
    ;
    get root() {
        return this._root;
    }
    set root(root) {
        if (!root)
            throw { error: "not defined root" };
        if (this.isRoot(root)) {
            this._root = this.setRoot(root);
        }
        else
            throw { error: "not is root" };
    }
    get elements() {
        if (!this._root)
            throw { error: "not defined root" };
        return this._root.split("\\");
    }
    get length() {
        return this.elements.length;
    }
    get exist() {
        if (!this._root)
            throw { error: "not defined root" };
        return this.existRoot(this.root);
    }
}
exports.Root = Root;
class fileModel extends Root {
    constructor(root) {
        super(root);
        this.type = "file";
        if (!this.root)
            throw { error: "not defined root" };
        this._name = this.getName().name;
        this._extencion = this.getName().extension;
        this._content = [];
    }
    getName(root) {
        if (!root)
            return this.getName(this.root);
        else
            return {
                name: root
                    .split("\\")[root.split("\\").length - 1]
                    .split(".")
                    .filter((a, b, c) => b !== c.length - 1)
                    .join("."),
                extension: root
                    .split("\\")[root.split("\\").length - 1]
                    .split(".")
                    .filter((a, b, c) => b === c.length - 1)
                    .join("")
            };
    }
    read() { return this._content; }
    rename(newName) {
        this.root = this.remplace(-1, newName).root;
        this.extension = this.getName(this.concat(newName)).extension;
        return this.getName(this.concat(newName)).name;
    }
    write(data) {
        if (typeof data === "string")
            return data.split("\n");
        else if (Array.isArray(data))
            return data;
        else
            return [new String(data)];
    }
    writeLast(...data) {
        data.map(e => this._content.push(e));
        return this.content;
    }
    get extension() {
        return this._extencion;
    }
    set extension(a) {
        this._extencion = a;
    }
    get content() {
        return this._content = this.read();
    }
    set content(data) {
        this._content = this.write(data);
    }
    get name() {
        return this.getName(this.root).name;
    }
    set name(a) {
        if (!a)
            throw { error: "not defined name" };
        this._name = this.rename(a);
    }
}
exports.fileModel = fileModel;
class dirModel extends Root {
    constructor(root) {
        super(root);
        this._name = "";
        this.type = "dir";
        if (!this.root)
            throw { error: "not defined root" };
        this._name = this.getName();
        this._content = [];
    }
    getName(root) {
        if (!root)
            return this.getName(this.root);
        else
            return root
                .split("\\")[root.split("\\").length - 1];
    }
    read() { return this._content; }
    add(data) {
        if (typeof data === "object") {
            this.content.push(data);
            return data;
        }
        else
            throw { error: "not is explorer or create" };
    }
    rename(newName) {
        this.root = this.remplace(-1, newName).root;
        return this.getName(newName);
    }
    write(data) {
        if (typeof data === "object")
            return data;
        else
            throw { error: "not is explorer or create" };
    }
    get content() {
        return this.read();
    }
    set content(data) {
        this._content = this.write(data);
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
    }
    read() {
        if (!this.root)
            throw { error: "not defined root" };
        if (this.exist)
            return fs.readFileSync(this.root, {}).toString().split("\n");
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
        if (!this.root)
            throw { error: "not defined root" };
        if (this.exist) {
            let newRoot = this.remplace(-1, newName).root;
            if (newRoot)
                fs.renameSync(this.root, newRoot);
            else
                throw { error: "not create newRoot" };
            this._name = this.getName(newRoot).name;
            this._extencion = this.getName(newRoot).extension;
            this.root = newRoot;
            return newName;
        }
        else
            return newName;
    }
    write(data) {
        if (!this.root)
            throw { error: "not defined root" };
        let content = Array.isArray(data) ? data.join("\n") : data;
        if (this.exist) {
            fs.writeFileSync(this.root, content);
            return this.read();
        }
        else
            return data;
    }
}
exports.fileObject = fileObject;
class dirObject extends dirModel {
    constructor(root) {
        super(root);
    }
    read() {
        if (!this.root)
            throw { error: "not defined root" };
        if (this.exist) {
            return fs.readdirSync(this.root)
                .map((e) => new explorer_1.explorer(e));
        }
        else {
            return this._content.map((e) => new create_1.create(e.data));
        }
    }
}
exports.dirObject = dirObject;
//# sourceMappingURL=tools.js.map