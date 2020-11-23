import * as path from "path"
import * as fs from "fs";
import file from "./tools/origin/file";
import dir from "./tools/origin/dir";
import is from "./tools/is";
import lastElement from "./tools/lastElement";
import make from "./tools/make/index";

class fileBrowser{
    make:any
    constructor(root:any=path.resolve("./")){
        root = path.resolve(is(root,false)==="string"?root:"./");
        if(fs.existsSync(path.resolve(typeof root === "string"?root:"./"))){
            if(is(lastElement(root.split("\\")))==="file"){
                this.setMethods(new file(root,fileBrowser));
            }else if(is(lastElement(root.split("\\")))==="dir"){
                this.setMethods(new dir(root,fileBrowser));
            }
            this.make = (name:string)=>new make(name,root);
        }else{
            throw {error:"not exist root "+path.resolve(root?root:"./")}
        }
    }
    setMethods(a:any){
        if(typeof a === "object"&&a.length<0)throw {error:"require object keys"}
        for (const name in a) {
            if (a.hasOwnProperty(name)) {
                const e:object = a[name];
                // this[]
            }
        }
    }
}

module.exports = fileBrowser;