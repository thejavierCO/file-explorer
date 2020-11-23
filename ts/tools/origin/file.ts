import path from "path";
import lastElement from "../lastElement"
import fs from "fs";

class File{
    type:string
    _root:string
    name:string
    read:(options:object)=>any
    constructor(root:string,manager:any){
        this.type = "file";
        this._root = root;
        this.name = lastElement(root.split("\\"))
        this.read = (options)=>fs.readFileSync(path.resolve(this._root),options)
    }
    get root(){
        return this._root;
    }
}

export default File;