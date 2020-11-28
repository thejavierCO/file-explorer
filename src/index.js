"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileExplorer = void 0;
const tools_1 = require("./tools");
const create_1 = require("./create");
const explorer_1 = require("./explorer");
class fileExplorer {
    constructor(root = "./") {
        this.isExist = false;
        if (tools_1.existRoot(tools_1.getRoot(root))) {
            this.type = tools_1.getTypeElement(root);
            this.root = tools_1.getRoot(root);
            this.isExist = tools_1.existRoot(root);
        }
        else {
            throw { error: "not exist root", root };
        }
    }
    get create() {
        return (type) => {
            if (!type)
                return {
                    file: (name) => new create_1.create(tools_1.getRoot(this.root, name), "file"),
                    dir: (name) => new create_1.create(tools_1.getRoot(this.root, name), "dir")
                };
            else if (typeof type === "string")
                return new create_1.create(tools_1.getRoot(this.root, type), tools_1.getTypeElement(type));
            else
                return new create_1.create(tools_1.getRoot(this.root), type);
        };
    }
    get explorer() {
        return new explorer_1.explorer(this.root);
    }
}
exports.fileExplorer = fileExplorer;
exports.fileExplorer = fileExplorer;
//# sourceMappingURL=index.js.map