const path = require("path");
const fs = require("fs");
const lastElement = require("../lastElement")
const fse = require("fs-extra");
const is = require("../is");

class Dir{
    constructor(root,manager){
        this.type = "dir";
        this._root = root;
        this.name = lastElement(root.split("\\"))
        this.set = (name)=>name?(
                is(name)==="function"?
                    name(this)
                :!fs.existsSync(path.resolve(this._root,name))?
                ((a)=>{
                    fs.mkdirSync(a)
                    return new manager(a)
                })(path.resolve(this._root,name))
                :((a)=>{
                    throw {error:"exist directory",path:a}
                })(path.resolve(this._root,name))
            ):(
                ((a)=>{
                    throw {error:"not defined name",path:a}
                })(path.resolve(this._root))
            );
        this.get = (name)=>name?(
                is(name)==="function"?
                name(this)
                :fs.existsSync(path.resolve(this._root,name))?
                ((a)=>{
                    return new manager(a)
                })(path.resolve(this._root,name)):
                ((a)=>{
                    throw {error:"not exist directory",path:a}
                })(path.resolve(this._root,name))
            ):(
                ((a)=>{
                    throw {error:"not defined name",path:a}
                })(path.resolve(this._root))
            );
        this.del = (name)=>name?(
            fs.existsSync(path.resolve(this._root,name))?
            fs.rmdirSync(path.resolve(this._root,name)):
            ((a)=>{
                throw {error:"not exist directory",path:a}
            })(path.resolve(this._root,name))
        ):(
            fs.existsSync(path.resolve(this._root))?
            fs.rmdirSync(path.resolve(this._root)):
            ((a)=>{
                throw {error:"not exist directory",path:a}
            })(path.resolve(this._root))
        );
        this.read = (name)=>name?(
            ((a)=>fs.readdirSync(a).map(e=>({...new manager(path.resolve(a,e))})))
            (path.resolve(this._root,name))
        ):(
            ((a)=>fs.readdirSync(a).map(e=>({...new manager(path.resolve(a,e))})))
            (path.resolve(this._root))
        );
        this.add = (element)=>{
            if(is(element)==="object"){
                let {type,name} = element;
                switch(type){
                    case "file":
                        // return fse.moveSync(path.resolve(_root),path.resolve(root))
                    break;
                    case "dir":
                        if(!fs.existsSync(element.root)){
                            this.set(name).set((a)=>{
                                element.read().map(e=>{
                                    a.add(e)
                                })
                            })
                        }else{
                            this.get(name).set((a)=>{
                                element.read().map(e=>{
                                    a.add(e)
                                })
                            })
                        }
                    break;
                }
                return this;
            }else{
                throw {error:"require elements by make"}
            }
        }
        this.filter = (condicion,name)=>this.read(name).filter(condicion)
    }
    set root(a){
        return this._root = a;
    }
    get root(){
        return this._root;
    }
}

module.exports = Dir;