const path = require("path");
const fs = require("fs");

class Dir{
    constructor(root,manager){
        this.type = "dir";
        this.set = (name)=>!fs.existsSync(path.resolve(root,name))?
        fs.mkdirSync(path.resolve(root,name))
        :((a)=>{
            throw {error:"exist directory",path:a}
        })(path.resolve(root,name));
        this.get = (name)=>fs.existsSync(path.resolve(root,name))?
        new manager(path.resolve(root,name)):
        ((a)=>{
            throw {error:"not exist directory",path:a}
        })(path.resolve(root,name))
        this.del = (name)=>name?fs.existsSync(path.resolve(root,name))?
        fs.rmdirSync(path.resolve(root,name)):
        ((a)=>{
            throw {error:"not exist directory",path:a}
        })(path.resolve(root,name)):fs.existsSync(path.resolve(root))?
        fs.rmdirSync(path.resolve(root)):
        ((a)=>{
            throw {error:"not exist directory",path:a}
        })(path.resolve(root))
        this.read = (name)=>{}
        this.add = (element)=>{}
        this.filter = (fs)=>{}
    }
}

module.exports = Dir;