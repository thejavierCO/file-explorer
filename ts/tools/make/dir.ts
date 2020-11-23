// import * as path from "path";
// import make from "./index";
// import lastElement from "../lastElement"
// import is from "../is";

// type data = any

class dirBase{
    // name:string
    // root:string
    // type:string
    // _content:Array<data>
    // constructor(root=""){
    //     root = path.join(root);
    //     this.name = lastElement(root.split("\\"));
    //     this.root = path.join(root);
    //     this.type = "dir";
    //     this._content = [];
    // }
    // set(name:any){
    //     if(!name)throw {error:"not defined name"}
    //     if(is(name,false)==="string"){
    //         let elem:data = new make(path.join(this.root,name));
    //         if(this.filter(e=>e.name==elem.name&&e.type==elem.type).length === 0){
    //             elem.root = path.join(this.root,name)
    //             this._content.push(elem);
    //             return elem;
    //         }else{
    //             throw {error:"exist element"}
    //         }
    //     }else if(is(name)==="function"){
    //         let data = name(this)
    //         if(is(data)!=="undefined"&&data!==""){
    //             console.log(data);
    //         }
    //         return this;
    //     }else{
    //         throw {error:"require name string or more elements with function"}
    //     }
    // }
    // get(name:string){
    //     if(!name)throw {error:"not defined name"}
    //     let elem:data = new make(name,path.join(this.root,name));
    //     if(this.filter(e=>e.name==elem.name&&e.type==elem.type).length === 1){
    //         return elem;
    //     }else{
    //         throw {error:"not exist element"}
    //     }
    // }
    // read(name:string){
    //     if(!name)return this._content;
    //     let elem:data = new make(name,path.join(this.root,name));
    //     if(this.filter(e=>e.name==elem.name&&e.type==elem.type).length === 1){
    //         return this.filter(e=>e.name==elem.name&&e.type==elem.type)[0];
    //     }else{
    //         throw {error:"not exist "+elem.type}
    //     }
    // }
    // filter(condicion:(a:{name:string,type:string,root:string})=>boolean){
    //     return this._content.filter(condicion);
    // }
}

export default dirBase;