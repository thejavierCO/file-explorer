import {getTypeElement,root,type,name,fileObject,dirObject, Root} from "./tools"
import {create} from "./create";
import {explorer} from "./explorer";

export interface IfileExplorer{
    type:type;
    create:({file:(name?:string)=>fileObject,dir:(name?:string)=>fileObject|dirObject|undefined})
    explorer:explorer
}

export class fileExplorer implements IfileExplorer{
    root;
    type;
    constructor(root:root){
        this.root = new Root(root);
        this.type = getTypeElement(this.root.root);
    }
    create = {
        file:(name:string)=>create(this.root.getRoot(this.root.root,name),"file"),
        dir:(name:string)=>create(this.root.getRoot(this.root.root,name),"dir")
    }
    get explorer(){
        return new explorer(this.root.root);
    }
}

exports.fileExplorer = fileExplorer;