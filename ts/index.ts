import {getTypeElement,root,type,name,Root} from "./tools"
import {create} from "./create";
import {explorer} from "./explorer";

export interface IfileExplorer{
    type:type;
    create:({file:()=>create,dir:()=>create})
    explorer:explorer
}

export class fileExplorer extends Root implements IfileExplorer{
    type;
    constructor(root:root){
        super(root);
        this.type = getTypeElement(this.root);
    }
    create = {
        file:(name?:string)=>new create(this.getRoot(this.root,name),"file"),
        dir:(name?:string)=>new create(this.getRoot(this.root,name),"dir")
    }
    get explorer(){
        return new explorer(this.root);
    }
}

exports.fileExplorer = fileExplorer;