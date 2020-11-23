const path = require("path");
const lastElement = require("../lastElement")
const fs = require("fs");

class File{
    constructor(root,manager){
        this.type = "file";
        this._root = root;
        this.name = lastElement(root.split("\\"))
        this.read = (options)=>fs.readFileSync(path.resolve(this._root),options)
    }
    get root(){
        return this._root;
    }
}

module.exports = File;