"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.explorer = void 0;
const tools_1 = require("../tools");
class explorer {
    constructor(root) {
        this.name = "";
        if (!root)
            throw { error: "require type root" };
        let data = this.info(tools_1.getTypeElement(tools_1.lastItem(root.split("\\"))), root);
        if (data) {
            this.name = data.name;
            this.type = data.type;
            this.root = data.root;
            this.exist = data.isExist;
        }
        else {
            throw { error: "element not is file or dir" };
        }
    }
    info(type, root) { return tools_1.ObjectType(type, root); }
    get content() {
        var _a;
        return (_a = this.info(this.type, this.root)) === null || _a === void 0 ? void 0 : _a.content;
    }
}
exports.explorer = explorer;
//# sourceMappingURL=index.js.map