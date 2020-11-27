"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileExplorer = void 0;
const tools_1 = require("./tools");
class fileExplorer {
    constructor(root = "./") {
        if (tools_1.existRoot(tools_1.getRoot(root))) {
            this.type = tools_1.getTypeElement(root);
            this.root = tools_1.getRoot(root);
        }
        else {
            throw { error: "not exist root", root };
        }
    }
}
exports.fileExplorer = fileExplorer;
exports.fileExplorer = fileExplorer;
//# sourceMappingURL=index.js.map