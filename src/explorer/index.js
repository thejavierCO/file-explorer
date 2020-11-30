"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.explorer = void 0;
const tools_1 = require("../tools");
const create_1 = require("../create");
class explorer {
    constructor(root) {
        let data = create_1.create(root, tools_1.getTypeElement(root));
        if (data && data.exist) {
            this.data = data;
        }
        else {
            console.log(data);
        }
    }
}
exports.explorer = explorer;
//# sourceMappingURL=index.js.map