// import {existPath,getRoot,getType,is,lastItem,fileObject,dirObject} from "../tools"
// // import {create} from "../create";

// export interface Iexplorer{
//     // root:string|undefined
//     // type:string|undefined
//     // name:string|undefined
//     // content:string[] | explorer[] | {get:()=>undefined|explorer} | undefined
// }


// export class explorer implements Iexplorer{
//     // root;
//     // _name:string|undefined;
//     // type;
//     // constructor(root:string){
//     //     if(existPath(getRoot(root))){
//     //         this.root = getRoot(root);
//     //         this._name = lastItem(root.split("\\"));
//     //         if(this._name!==undefined)this.type = is(this._name);
//     //     }else{
//     //         throw {error:"not exist root",root}
//     //     }
//     // }
//     // get content(){
//     //     return {
//     //         get:(name:string):undefined|explorer|string[]=>{
//     //             if(typeof name === "string")
//     //             return getType(this).get(name);
//     //             else return undefined;
//     //         },
//     //         ...getType(this).content
//     //     }
//     // }
//     // set content(data){
//     //     if(this.type === "file"&&typeof data === "string")getType(this).content = data;
//     // }
//     // get name(){
//     //     return this._name = getType(this).name;
//     // }
//     // set name(newName){
//     //     getType(this).name = newName
//     // }
// }