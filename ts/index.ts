import {existRoot,getRoot, getTypeElement} from "./tools"
import {create} from "./create";
import {explorer} from "./explorer";


export interface IfileExplorer{
}

export class fileExplorer implements IfileExplorer{
    root;
    type;
    constructor(root:string="./"){
        if(existRoot(getRoot(root))){
            this.type = getTypeElement(root);
            this.root = getRoot(root);
        }else{
            throw {error:"not exist root",root}
        }
    }
}

exports.fileExplorer = fileExplorer;