"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypeModel = exports.getType = exports.dirModel = exports.fileModel = exports.dirObject = exports.fileObject = exports.is = exports.lastItem = exports.existPath = exports.getRoot = void 0;
function getRoot(...name) {
}
exports.getRoot = getRoot;
function existPath(root = getRoot()) {
}
exports.existPath = existPath;
function lastItem(element) {
}
exports.lastItem = lastItem;
function is(element) {
}
exports.is = is;
class fileObject {
}
exports.fileObject = fileObject;
class dirObject {
}
exports.dirObject = dirObject;
class fileModel extends fileObject {
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