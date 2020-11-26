"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileExplorer = void 0;
const tools_1 = require("./tools");
const create_1 = require("./create");
const explorer_1 = require("./explorer");
class fileExplorer {
    constructor(root = tools_1.getRoot("./")) {
        this.root = "";
        this.type = "other";
        this.create = (root) => new create_1.create(tools_1.getRoot(this.root, root ? root : ""));
        this.explorer = () => new explorer_1.explorer(this.root);
        if (tools_1.existPath(tools_1.getRoot(root))) {
            this.root = tools_1.getRoot(root);
            this.type = tools_1.is(root);
        }
        else {
            throw { error: "not exist root", root };
        }
    }
}
exports.fileExplorer = fileExplorer;
exports.fileExplorer = fileExplorer;
//# sourceMappingURL=index.js.map