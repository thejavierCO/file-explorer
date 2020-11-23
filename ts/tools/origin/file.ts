import * as path from "path";
import * as fs from "fs";
import IFile from "../../Types/file"
import lastElement from "../lastElement"
import make from "../make/index";
import is from "../is";

class File implements IFile{
    root = "";
    name = "";
    type = "file";
    make = make;
    // read = this._read
    constructor(root:string){
        this.root = root;
        this.name = lastElement(root.split("\\"))
    }
    read(){
        return fs.readFileSync(this.root,{encoding:"utf8"}).split("\n")
    }
}

export default File;