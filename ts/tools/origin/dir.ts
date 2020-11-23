// import * as path from "path";
// import * as fs from "fs";
// import lastElement from "../lastElement";
// import is from "../is"

// interface IDir{
//     type:string
//     _root:string
//     name:string
//     set:(name:any)=>any
//     get:(name:any)=>any
//     del:(name:any)=>any
//     read:(name:any)=>any
//     add:(name:any)=>any
//     filter:(condicion:Function,name:string)=>object
// }

class Dir{
    // type = ""
    // _root = ""
    // name = ""
    // set:(name:any)=>any
    // get:(name:any)=>any
    // del:(name:any)=>any
    // read:(name:any)=>any
    // add:(name:any)=>any
    // filter:(condicion:Function,name:string)=>object
    // constructor(root:string,manager:any){
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
    // }
}

export default Dir;