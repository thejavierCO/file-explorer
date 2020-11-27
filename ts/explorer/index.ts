import * as fs from "fs";
import {dirObject,fileObject,getTypeElement,root,getRoot} from "../tools"
import {create} from "../create";

export interface Iexplorer{
    root:root
    name:string
}
export class explorer implements Iexplorer{
    root = "";
    name = "";
    constructor(root:string){
        this.root = getRoot(root);
    }
}