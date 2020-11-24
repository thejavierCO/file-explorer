const path = require("path");
const lastElement = require("../tools/lastElement");

class fileBase{
    constructor(root=""){
        root = path.join(root);
        this.name = lastElement(root.split("\\"));
        this.type = "file";
        this._content = "";
        this.read = ()=>this._content;
    }
}

module.exports = fileBase;