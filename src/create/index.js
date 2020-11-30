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
exports.create = void 0;
const fs = __importStar(require("fs"));
const tools_1 = require("../tools");
function create(root, type) {
    if (typeof root === "object")
        return root;
    const data = tools_1.ObjectType(type ? type : tools_1.getTypeElement(type), root);
    if (!data)
        throw { error: "not get data processing" };
    if (data.exist && data.root) {
        try {
            if (fs.readdirSync(data.root)) {
                data.content = fs.readdirSync(data.root);
                return data;
            }
        }
        catch (err) {
            if (err.code === "ENOTDIR") {
                return tools_1.ObjectType("file", root);
            }
            else
                throw err;
        }
    }
    else
        return data;
}
exports.create = create;
//# sourceMappingURL=index.js.map