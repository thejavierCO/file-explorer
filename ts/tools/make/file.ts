import path from "path"
import lastElement from "../lastElement"

class fileBase{
    name:string
    type:string
    _content:string
    read:Function
    constructor(root=""){
        root = path.join(root);
        this.name = lastElement(root.split("\\"));
        this.type = "file";
        this._content = "";
        this.read = ()=>this._content;
    }
}

export default fileBase;