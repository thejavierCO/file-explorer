import {existRoot,getRoot, getTypeElement} from "./tools"
// import {create} from "./create";
// import {explorer} from "./explorer";


export interface IfileExplorer{
    // root:root|string|undefined;
    // type:"file"|"dir"|"other"|undefined;
    // create:(name:string)=>create
    // explorer:explorer
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
    // private _create = (name:string)=>new create(getRoot(this.root,name));
    // private _explorer = ()=>new explorer(this.root);
    // get create(){
    //     return this._create;
    // }
    // get explorer(){
    //     return this._explorer();
    // }
}

exports.fileExplorer = fileExplorer;