"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const tools_1 = require("../tools");
class create {
    constructor(root) {
        this.get = (name) => { };
        this.set = (name) => { };
        this.read = (name) => { };
        this.del = (name) => { };
        this.add = (model) => { };
        this.root = tools_1.getRoot(root);
        this.type = tools_1.is(root);
        this.name = tools_1.lastItem(root.split("\\"));
    }
}
exports.create = create;
//# sourceMappingURL=index.js.map