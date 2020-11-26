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
exports.getTypeModel = exports.getType = exports.dirModel = exports.fileModel = exports.dirObject = exports.fileObject = exports.is = exports.lastItem = exports.existPath = exports.getRoot = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const explorer_1 = require("./explorer");
function getRoot(...name) {
    let root = name.join("/");
    return path.resolve(root);
}
exports.getRoot = getRoot;
function existPath(root = getRoot()) {
    return fs.existsSync(root);
}
exports.existPath = existPath;
function lastItem(element) {
    return element[element.length - 1];
}
exports.lastItem = lastItem;
function is(element) {
    element = lastItem(element.split("\\"));
    if (/([.]([\w\d]{0,}))/i.test(element))
        return "file";
    else
        return "dir";
}
exports.is = is;
class fileObject {
    constructor(exp) {
        this.get = (name) => { };
        this.set = (name) => { };
        this.read = () => {
            if (existPath(this.root) && this.root) {
                return fs.readFileSync(this.root)
                    .toString()
                    .split("\n");
            }
            else {
                throw { error: "not exist rooot" };
            }
        };
        this.del = (name) => { };
        this.add = (model) => { };
        this.type = "file";
        this.root = exp.root;
        this.name = lastItem(exp.root.split("\\"));
        this.extension = lastItem(exp.root.split("\\")).split(".")[0];
    }
}
exports.fileObject = fileObject;
class dirObject {
    constructor(exp) {
        this.get = (name) => {
            if (this.root) {
                let root = getRoot(this.root);
                if (typeof name === "string" && this.root) {
                    root = getRoot(this.root, name);
                }
                if (existPath(root))
                    return new explorer_1.explorer(root);
                else
                    throw { error: "not exist root", root };
            }
            else {
                throw { error: "not defined root" };
            }
        };
        this.set = (name) => {
            console.log(this.get(name));
        };
        this.read = () => {
            if (this.root) {
                let root = getRoot(this.root);
                return fs.readdirSync(root)
                    .map(e => new explorer_1.explorer(getRoot(root, e)));
            }
            else {
                throw { error: "not defined root" };
            }
        };
        this.del = (name) => {
            console.log(name, "del");
        };
        this.add = (model) => {
            console.log(model, "add");
        };
        this.type = "dir";
        this.root = exp.root;
        this.name = lastItem(exp.root.split("\\"));
    }
}
exports.dirObject = dirObject;
class fileModel extends fileObject {
    constructor(root) {
        super(root);
    }
}
exports.fileModel = fileModel;
class dirModel extends dirObject {
    constructor(root) {
        super(root);
    }
}
exports.dirModel = dirModel;
function getType(exp) {
    if (!exp.type)
        throw { error: "not exist type" };
    if (exp.type === "file") {
        return new fileObject(exp);
    }
    else if (exp.type === "dir") {
        return new dirObject(exp);
    }
    else {
        throw { error: "not exist type", data: exp };
    }
}
exports.getType = getType;
function getTypeModel(exp) {
    if (!exp.type)
        throw { error: "not exist type" };
    if (exp.type === "file") {
        return new fileModel(exp);
    }
    else if (exp.type === "dir") {
        return new dirModel(exp);
    }
    else {
        throw { error: "not exist type", in: exp };
    }
}
exports.getTypeModel = getTypeModel;
//# sourceMappingURL=tools.js.map