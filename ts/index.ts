import {existRoot,getRoot, getTypeElement,root,type,name} from "./tools"
import {create} from "./create";
import {explorer} from "./explorer";


export interface IfileExplorer{
    root:root;
    type:type;
    isExist:boolean;
    create:(type:type)=>create|({file:()=>create,dir:()=>create})
    explorer:explorer
}

export class fileExplorer implements IfileExplorer{
    root;
    type;
    isExist = false;
    constructor(root:string="./"){
        if(existRoot(getRoot(root))){
            this.type = getTypeElement(root);
            this.root = getRoot(root);
            this.isExist = existRoot(root);
        }else{
            throw {error:"not exist root",root}
        }
    }
    get create(){
        return (type:type)=>{
            if(!type)return {
                file:(name?:string)=>new create(getRoot(this.root,name),"file"),
                dir:(name?:string)=>new create(getRoot(this.root,name),"dir")
            };
            else if(typeof type === "string")return new create(getRoot(this.root,type),getTypeElement(type));
            else return new create(getRoot(this.root),type)
        }
    }
    get explorer(){
        return new explorer(this.root);
    }
}

exports.fileExplorer = fileExplorer;