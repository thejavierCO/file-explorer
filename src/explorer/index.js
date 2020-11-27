"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.explorer = void 0;
const tools_1 = require("../tools");
class explorer {
    constructor(root) {
        if (tools_1.existPath(tools_1.getRoot(root))) {
            this.root = tools_1.getRoot(root);
            this._name = tools_1.lastItem(root.split("\\"));
            if (this._name !== undefined)
                this.type = tools_1.is(this._name);
        }
        else {
            throw { error: "not exist root", root };
        }
    }
    get content() {
        return Object.assign({ get: (name) => {
                if (typeof name === "string")
                    return tools_1.getType(this).get(name);
                else
                    return undefined;
            } }, tools_1.getType(this).content);
    }
    set content(data) {
        if (this.type === "file" && typeof data === "string")
            tools_1.getType(this).content = data;
    }
    get name() {
        return this._name = tools_1.getType(this).name;
    }
    set name(newName) {
        tools_1.getType(this).name = newName;
    }
}
exports.explorer = explorer;
//# sourceMappingURL=index.js.map