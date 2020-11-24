import {getLast,is,getObjectType, dirObject, fileObject} from "../tools"
import {Iexplorer, msg} from "../../Types/elements";
import * as path from "path";
import fs from "fs";
import create from "../create"

class explorer implements Iexplorer{
    [x:string]:any;
    type = "other";
    constructor(root:string){
        if(fs.existsSync(path.resolve(root))){
            const name = getLast(root.split("\\"))
            this.type = is(name);
            root = path.resolve(root);
            this[is(name)] = getObjectType(root)
        }else{
            throw new Error([
                "not access in",
                "Root: "+root,
                "",
                ""
            ].join("\n"))
        }
    }
    set = (name?: string | undefined) => {
        let type = this.getType();
        return type.set(name);
    };
    get = (name?: string | undefined) =>{
        let type = this.getType();
        return type.get(name);
    };
    del = (name: string) => {
        let type = this.getType();
        return type.del(name);
    };
    add = (...model:Array<object>) => {
        let type = this.getType();
        return type.add(model)
    };
    read = (input:string|object)=>{
        let type = this.getType();
        return type.read(input?input:"")
    }
    getName = ()=>{
        let type = this.getType();
        return type.name||"";
    }
    getType = ()=>{
        if(this.type === "dir"){
            return this.dir
        }else if(this.type === "file"){
            return this.file
        }else{
            console.log("\n"+"--".repeat(10),this,"--".repeat(10)+"\n")
            throw new Error("not defined type")
        }
    }
}

export default explorer;