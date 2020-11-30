"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileExplorer = void 0;
const tools_1 = require("./tools");
const create_1 = require("./create");
const explorer_1 = require("./explorer");
class fileExplorer extends tools_1.Root {
    constructor(root) {
        super(root);
        this.create = {
            file: (name) => new create_1.create(this.getRoot(this.root, name), "file"),
            dir: (name) => new create_1.create(this.getRoot(this.root, name), "dir")
        };
        this.type = tools_1.getTypeElement(this.root);
    }
    get explorer() {
        return new explorer_1.explorer(this.root);
    }
}
exports.fileExplorer = fileExplorer;
exports.fileExplorer = fileExplorer;
//# sourceMappingURL=index.js.map