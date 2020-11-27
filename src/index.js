"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileExplorer = void 0;
const tools_1 = require("./tools");
const create_1 = require("./create");
const explorer_1 = require("./explorer");
class fileExplorer {
    constructor(root = tools_1.getRoot("./")) {
        this._create = (name) => new create_1.create(tools_1.getRoot(this.root, name));
        this._explorer = () => new explorer_1.explorer(this.root);
        if (tools_1.existPath(tools_1.getRoot(root))) {
            this.type = tools_1.is(root);
            this.root = tools_1.getRoot(root);
        }
        else {
            throw { error: "not exist root", root };
        }
    }
    get create() {
        return this._create;
    }
    get explorer() {
        return this._explorer();
    }
}
exports.fileExplorer = fileExplorer;
exports.fileExplorer = fileExplorer;
//# sourceMappingURL=index.js.map