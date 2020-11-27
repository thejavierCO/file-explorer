import {existPath,getRoot,fileObject,dirObject,is} from "./tools"
import {create} from "./create";
import {explorer} from "./explorer";

export interface IfileExplorer{
    // [x:string]:any
    // root:string
    // type:string
    // file?:fileObject|undefined;
    // dir?:dirObject|undefined;
    // create:(root:string)=>create
    // explorer:()=>explorer
}

export class fileExplorer implements IfileExplorer{
    // root = "";
    // type = "other";
    // constructor(root:string=getRoot("./")){
    //     if(existPath(getRoot(root))){
    //         this.root = getRoot(root)
    //         this.type = is(root);
    //     }else{
    //         throw {error:"not exist root",root}
    //     }
    // }
    // create = (root:string)=>new create(getRoot(this.root,root?root:""));
    // explorer = ()=>new explorer(this.root);
}

exports.fileExplorer = fileExplorer;