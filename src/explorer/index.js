"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.explorer = void 0;
const tools_1 = require("../tools");
class explorer {
    constructor(root) {
        this.root = "";
        this.name = "";
        this.root = tools_1.getRoot(root);
    }
}
exports.explorer = explorer;
//# sourceMappingURL=index.js.map