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
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = __importStar(require("path"));
var fs = __importStar(require("fs"));
var file_1 = __importDefault(require("../tools/origin/file"));
var dir_1 = __importDefault(require("../tools/origin/dir"));
var is_1 = __importDefault(require("../tools/is"));
var lastElement_1 = __importDefault(require("../tools/lastElement"));
var fileBrowser = (function () {
    function fileBrowser(root) {
        if (root === void 0) { root = path.resolve("./"); }
        root = path.resolve(is_1.default(root, false) === "string" ? root : "./");
        if (fs.existsSync(path.resolve(typeof root === "string" ? root : "./"))) {
            if (is_1.default(lastElement_1.default(root.split("\\"))) === "file") {
                return new file_1.default(root);
            }
            else if (is_1.default(lastElement_1.default(root.split("\\"))) === "dir") {
                return new dir_1.default(root);
            }
        }
        else {
            throw { error: "not exist root " + path.resolve(root ? root : "./") };
        }
    }
    return fileBrowser;
}());
exports.default = fileBrowser;
