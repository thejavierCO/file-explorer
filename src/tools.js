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
exports.lastItem = exports.getTypeElement = exports.existRoot = exports.getRoot = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
function getRoot(...root) {
    return path.resolve(root.join("\\"));
}
exports.getRoot = getRoot;
function existRoot(...root) {
    return fs.existsSync(getRoot(root.join("\\")));
}
exports.existRoot = existRoot;
function getTypeElement(element) {
    if (/[.]([\w\d]{0,})/i.test(element))
        return "file";
    else
        return "dir";
}
exports.getTypeElement = getTypeElement;
function lastItem(element) {
    return element[element.length - 1];
}
exports.lastItem = lastItem;
//# sourceMappingURL=tools.js.map