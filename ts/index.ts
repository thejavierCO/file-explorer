import {Imain} from "./Types/elements" 
import * as path from "path"
import fs from "fs";
import explorer from "./tools/explorer/index"
import create from "./tools/create/index"

class fileExplorer implements Imain{
    root = "";
    constructor(root:string){
        if(fs.existsSync(path.resolve(root))){
            this.root = path.resolve(root)
        }else{
            throw new Error("not defined root")
        }
    }
    create = ()=>new create(this.root);
    explorer = ()=>new explorer(this.root);
}

module.exports = fileExplorer