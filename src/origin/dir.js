const path = require("path");
const fs = require("fs");
const lastElement = require("../tools/lastElement");
const is = require("../tools/is");

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
        this.del = (name,options={subdirectory:false})=>{
            try{
                return fs.existsSync(path.resolve(this._root,name?name:""))?
                (
                    (root)=>{
                        if(subdirectory===true){
                            throw {errno:-4051,code:"ENOTEMPTY"}
                        }else{
                            fs.rmdirSync(root)
                        }
                        return {del:root}
                    }
                )(path.resolve(this._root,name?name:""))
                :(
                    (root)=>{
                        throw "not exist directory\n root: "+root;
                    }
                )(path.resolve(this._root,name?name:""));
            }catch(err){
                console.log(err)
                if(err.errno === -4051&&err.code === "ENOTEMPTY"){
                    let {subdirectory} = options;
                    if(subdirectory===true&&this.read().length>0){
                        this.read().map(e=>{
                            console.log("delete "+e.type+" in "+e._root);
                            e.del();
                        })
                    }else{
                        return {
                            status:false,
                            message:"directory not empty"
                        }
                    }
                }else{
                    throw {error:err}
                }
            }
        };
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