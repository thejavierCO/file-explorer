import {existPath,getRoot,getTypeModel,is,model,lastItem} from "../tools"
import {fileExplorer} from "../index";
import {explorer} from "../explorer";

export interface Icreate{
    root:string|undefined
    type:string|undefined
    name:string|undefined
    // content:explorer|Array<explorer>|undefined;
}

export type optionsCreate = {
    name:string
    type:"file"|"dir"
    content:string|Array<string>
}

export class create implements Icreate{
    private _root;
    private _name;
    constructor(root:string){
        this._root = getRoot(root);
        this._name = lastItem(root.split("\\"));
    }
    get type(){
        return is(this.root);
    }
    get root(){
        return this._root;
    }
    get content(){
        return getTypeModel(this).content;
    }
    set content(data){
        getTypeModel(this).content = data;
    }
    get name(){
        return this._name
    }
    set name(reName){
        if(typeof reName === "string")this._name = getTypeModel(this).name = reName;
    }
}