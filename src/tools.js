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
function getRoot(...name) {
    let root = name.join("/");
    return path.resolve(root);
}
exports.getRoot = getRoot;
function existPath(root) {
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
    else if (!/([.]([\w\d]{0,}))/i.test(element))
        return "dir";
    else
        return "other";
}
exports.is = is;
class fileObject {
}
exports.fileObject = fileObject;
class dirObject {
}
exports.dirObject = dirObject;
class fileModel extends fileObject {
    constructor(root) {
        super(root);
        this.content = [];
    }
}
exports.fileModel = fileModel;
class dirModel extends dirObject {
}
exports.dirModel = dirModel;
function getType(exp) {
}
exports.getType = getType;
function getTypeModel(exp) {
}
exports.getTypeModel = getTypeModel;
//# sourceMappingURL=tools.js.map