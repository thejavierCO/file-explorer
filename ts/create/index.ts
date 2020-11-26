import {existPath,getRoot,getTypeModel,is, lastItem} from "../tools"
import {fileExplorer} from "../index";
import {explorer} from "../explorer";

export interface Icreate{
    root:string|undefined;
    type:string|undefined;
    name:string|undefined;
    get:(name:string)=>any
    set:(name:string)=>any
    read:(name?:string)=>any
    del:(name?:string)=>any
    add:(model:create)=>any
}


export class create implements Icreate{
    root;
    type;
    name;
    constructor(root:string){
        this.root = getRoot(root);
        this.type = is(root);
        this.name = lastItem(root.split("\\"));
    }
    get = (name:string)=>{}
    set = (name:string)=>{}
    read = (name?:string)=>{}
    del = (name?:string)=>{}
    add = (model:create)=>{}
}