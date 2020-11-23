import * as path from "path";
import * as fs from "fs";
import IDir from "../../Types/dir"
import lastElement from "../lastElement";
import make from "../make/index";
import fb from "../../FileBowser/index"


class Dir implements IDir{
    root = "";
    name = "";
    type = "dir";
    make = make;
    // read = this._read;
    constructor(root:string){
        this.root = root;
        this.name = lastElement(this.root.split("\\"))
    }
    read(name?:string){
        let root = path.resolve(this.root,typeof name ==="string"?name:"")
        return fs.readdirSync(root).map(e=>new fb(path.resolve(root,e)))
    }
}

export default Dir;

//     this.type = "dir";
//     this._root = root;
//     this.name = lastElement(root.split("\\"))
//     this.set = (name)=>name?(
//             is(name)==="function"?
//                 name(this)
//             :!fs.existsSync(path.resolve(this._root,name))?
//             ((a)=>{
//                 fs.mkdirSync(a)
//                 return new manager(a)
//             })(path.resolve(this._root,name))
//             :((a)=>{
//                 throw {error:"exist directory",path:a}
//             })(path.resolve(this._root,name))
//         ):(
//             ((a)=>{
//                 throw {error:"not defined name",path:a}
//             })(path.resolve(this._root))
//         );
//     this.get = (name:any)=>name?(
//             is(name)==="function"?
//             name(this)
//             :fs.existsSync(path.resolve(this._root,name))?
//             ((a)=>{
//                 return new manager(a)
//             })(path.resolve(this._root,name)):
//             ((a)=>{
//                 throw {error:"not exist directory",path:a}
//             })(path.resolve(this._root,name))
//         ):(
//             ((a)=>{
//                 throw {error:"not defined name",path:a}
//             })(path.resolve(this._root))
//         );
//     this.del = (name:any)=>name?(
//         fs.existsSync(path.resolve(this._root,name))?
//         fs.rmdirSync(path.resolve(this._root,name)):
//         ((a)=>{
//             throw {error:"not exist directory",path:a}
//         })(path.resolve(this._root,name))
//     ):(
//         fs.existsSync(path.resolve(this._root))?
//         fs.rmdirSync(path.resolve(this._root)):
//         ((a)=>{
//             throw {error:"not exist directory",path:a}
//         })(path.resolve(this._root))
//     );
//     this.read = (name:any)=>name?(
//         ((a)=>fs.readdirSync(a).map(e=>({...new manager(path.resolve(a,e))})))
//         (path.resolve(this._root,name))
//     ):(
//         ((a)=>fs.readdirSync(a).map(e=>({...new manager(path.resolve(a,e))})))
//         (path.resolve(this._root))
//     );
//     this.add = (element:any)=>{
//         if(is(element)==="object"){
//             let {type,name} = element;
//             switch(type){
//                 case "file":
//                     // return fse.moveSync(path.resolve(_root),path.resolve(root))
//                 break;
//                 case "dir":
//                     if(!fs.existsSync(element.root)){
//                         this.set(name).set((a:any)=>{
//                             element.read().map((e:any)=>{
//                                 a.add(e)
//                             })
//                         })
//                     }else{
//                         this.get(name).set((a:any)=>{
//                             element.read().map((e:any)=>{
//                                 a.add(e)
//                             })
//                         })
//                     }
//                 break;
//             }
//             return this;
//         }else{
//             throw {error:"require elements by make"}
//         }
//     }
//     this.filter = (condicion,name)=>this.read(name).filter(condicion)