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
exports.dirObject = exports.fileObject = exports.dirModel = exports.fileModel = exports.Root = exports.ObjectType = exports.lastItem = exports.getTypeElement = void 0;
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
        if (this.isRoot(root)) {
            this._root = toRoot(root);
        }
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
    get root() {
        return this._root;
    }
    get lastElement() {
        return this._root[this._root.length - 1];
    }
    get firstElement() {
        return this._root[0];
    }
    getRoot(...root) {
        return this.toRoot(root);
    }
    existRoot(...root) {
        return fs.existsSync(this.getRoot(root.join("\\")));
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
            return path.resolve(element.join("\\"));
        }
        else {
            throw { error: "not convert root" };
        }
    }
}
exports.Root = Root;
class fileModel extends Root {
    constructor(root) {
        super(root);
    }
}
exports.fileModel = fileModel;
class dirModel extends Root {
    constructor(root) {
        super(root);
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