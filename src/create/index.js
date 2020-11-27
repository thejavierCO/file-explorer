"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const tools_1 = require("../tools");
class create {
    constructor(root) {
        this._root = tools_1.getRoot(root);
        this._name = tools_1.lastItem(root.split("\\"));
    }
    get type() {
        return tools_1.is(this.root);
    }
    get root() {
        return this._root;
    }
    get content() {
        return tools_1.getTypeModel(this).content;
    }
    set content(data) {
        tools_1.getTypeModel(this).content = data;
    }
    get name() {
        return this._name;
    }
    set name(reName) {
        if (typeof reName === "string")
            this._name = tools_1.getTypeModel(this).name = reName;
    }
}
exports.create = create;
//# sourceMappingURL=index.js.map