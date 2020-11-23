import * as path from "path"
import fileBrowser from "./FileBowser/index";

class fileExplorer{
    root:string
    constructor(root:string){
        this.root = path.resolve(root)
    }
}

module.exports = fileExplorer;