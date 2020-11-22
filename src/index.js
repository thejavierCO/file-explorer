let path = require("path");
let fs = require("fs");
let file = require("./tools/file");
let dir = require("./tools/dir");
let is = require("./tools/is");
let lastElement = require("./tools/lastElement");

class fileBase{
    constructor(root=""){
        root = path.join(root);
        this.name = lastElement(root.split("\\"));
        this.type = "file";
        this._content = "";
        this.read = ()=>this._content;
    }
}

class dirBase{
    constructor(root=""){
        root = path.join(root);
        this.name = lastElement(root.split("\\"));
        this.root = path.join(root);
        this.type = "dir";
        this._content = [];
    }
    set(name){
        if(!name)throw {error:"not defined name"}
        if(is(name,false)==="string"){
            let elem = new make(path.join(this.root,name));
            if(this.filter(e=>e.name==elem.name&&e.type==elem.type).length === 0){
                elem.root = path.join(this.root,name)
                this._content.push(elem);
                return elem;
            }else{
                throw {error:"exist element"}
            }
        }else if(is(name)==="function"){
            let data = name(this)
            if(is(data)!=="undefined"&&data!==""){
                console.log(data);
            }
            return this;
        }else{
            throw {error:"require name string or more elements with function"}
        }
    }
    get(name){
        if(!name)throw {error:"not defined name"}
        let elem = new make(name,path.join(this.root,name));
        if(this.filter(e=>e.name==elem.name&&e.type==elem.type).length === 1){
            return elem;
        }else{
            throw {error:"not exist element"}
        }
    }
    read(name){
        if(!name)return this._content;
        let elem = new make(name,path.join(this.root,name));
        if(this.filter(e=>e.name==elem.name&&e.type==elem.type).length === 1){
            return this.filter(e=>e.name==elem.name&&e.type==elem.type)[0];
        }else{
            throw {error:"not exist "+elem.type}
        }
    }
    filter(condicion){
        return this._content.filter(condicion);
    }
}

class make{
    constructor(type,name="temp",root){
        switch(type){
            case "file":
                root = root+"/"+name;
                return new fileBase(root);
            case "dir":
                root = root+"/"+name;
                return new dirBase(root);
            default:
                if(is(type)==="file"){
                    return new make("file",type,name);
                }else if(is(type)==="dir"){
                    return new make("dir",type,name);
                }
        }
    }
}

class fileBrowser{
    constructor(root=path.resolve("./")){
        root = path.resolve(is(root,false)==="string"?root:"./");
        if(fs.existsSync(path.resolve(typeof root === "string"?root:"./"))){
            if(is(lastElement(root.split("\\")))==="file"){
                this.Methods = new file(root,fileBrowser);
            }else if(is(lastElement(root.split("\\")))==="dir"){
                this.Methods = new dir(root,fileBrowser);
            }
            this.make = (name)=>new make(name,root);
        }else{
            throw {error:"not exist root "+path.resolve(root?root:"./")}
        }
    }
    set Methods(a){
        if(typeof a === "object"&&a.length<0)throw {error:"require object keys"}
        for (const name in a) {
            if (a.hasOwnProperty(name)) {
                const e = a[name];
                this[name] = e;
            }
        }
    }
}

module.exports = fileBrowser;