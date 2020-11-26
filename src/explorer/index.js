"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.explorer = void 0;
const tools_1 = require("../tools");
class explorer {
    constructor(root) {
        this.get = (name) => {
            if (!name)
                throw { error: "not defined name", in: "get explorer" };
            else
                return tools_1.getType(this).get(name);
        };
        this.set = (name) => {
            if (!name)
                throw { error: "not defined name", in: "set explorer" };
            else
                return tools_1.getType(this).set(name);
        };
        this.read = () => tools_1.getType(this).read();
        this.del = (name) => tools_1.getType(this).del(name);
        this.add = (model) => {
            if (!model)
                throw { error: "not defined name", in: "set explorer" };
            else
                return tools_1.getType(this).add(model);
        };
        if (tools_1.existPath(tools_1.getRoot(root))) {
            this._root = tools_1.getRoot(root);
            this._type = tools_1.is(root);
            this._name = this.name;
        }
        else {
            throw { error: "not exist root", root };
        }
    }
    get type() {
        return this._type;
    }
    get root() {
        return this._root;
    }
    get content() {
        return this.read();
    }
    set content(model) {
        this.add(model);
    }
    get name() {
        return tools_1.getType(this).name;
    }
}
exports.explorer = explorer;
//# sourceMappingURL=index.js.map