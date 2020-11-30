import * as fs from "fs";
import {dirObject, fileObject, getTypeElement,root} from "../tools"
import {create} from "../create";

export interface Iexplorer{
    data:fileObject|dirObject|undefined
}

export class explorer implements Iexplorer{
    data;
    constructor(root:root){
        let data = create(root,getTypeElement(root));
        if(data&&data.exist){
            this.data = data;
        }else{
            console.log(data)
        }
    }
}