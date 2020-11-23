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
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const lastElement_1 = __importDefault(require("../lastElement"));
const index_1 = __importDefault(require("../make/index"));
const index_2 = __importDefault(require("../../FileBowser/index"));
class Dir {
    constructor(root) {
        this.root = "";
        this.name = "";
        this.type = "dir";
        this.make = index_1.default;
        this.root = root;
        this.name = lastElement_1.default(this.root.split("\\"));
    }
    read(name) {
        let root = path.resolve(this.root, typeof name === "string" ? name : "");
        return fs.readdirSync(root).map(e => new index_2.default(path.resolve(root, e)));
    }
}
exports.default = Dir;
