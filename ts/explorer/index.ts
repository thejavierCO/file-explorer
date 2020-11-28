import * as fs from "fs";
import {dirObject,fileObject,fileContent,dirContent,getTypeElement,root,getRoot, type, name, lastItem,ObjectType, toRoot} from "../tools"
import {create} from "../create";
import { types } from "util";

export interface Iexplorer{
    root:root
    name:name
    type:type
    content: fileContent | dirContent|undefined;
    exist:boolean
}
export class explorer implements Iexplorer{
    root;
    name = "";
    type;
    exist:boolean
    constructor(root:root){
        if(!root)throw {error:"require type root"}
        let data = this.info(getTypeElement(lastItem(root.split("\\"))),root);
        if(data){
            this.name = data.name;
            this.type = data.type;
            this.root = data.root;
            this.exist = data.isExist
        }else{
            throw {error:"element not is file or dir"}
        }
    }
    protected info(type:type,root:root):fileObject|dirObject|undefined{return ObjectType(type,root);}
    get content(){
        return this.info(this.type,this.root)?.content
    }
}