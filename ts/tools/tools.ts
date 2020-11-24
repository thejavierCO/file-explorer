import {root,file,dir,other} from "../Types/elements";
import fs from "fs";
import path from "path"
import create from "./create";
import explorer from "./explorer";

let rgxfilter = /[.]/i;

export function getLast(array:Array<root>){
    return array[array.length-1];
}

function isDir(a:string){
    if(!rgxfilter.test(a)){
        return true
    }else{
        return false
    }
}

function isFile(a:string){
    if(rgxfilter.test(a)){
        return true
    }else{
        return false
    }
}

export function is(name:string){
    if(isDir(name)){
        return "dir"
    }else if(isFile(name)){
        return "file"
    }else{
        return "other"
    }
}

export class fileObject implements file{
    root = "";
    name = "";
    type = "file";
    extencion = "";
    content = "";
    constructor(root:string){
        this.root = root;
        this.name = getLast(root.split("\\"))
    }
    set = (name: string | Function) => {}
    get = (name?: string | undefined) => {}
    del = (name?: string) => {}
    add = (model: object) => {}
    read = () => fs.readFileSync(this.root,{encoding:"utf8"})
}

export class dirObject implements dir{
    root = "";
    name = "";
    type = "dir";
    content = [];
    constructor(root:string){
        this.root = root;
        this.name = getLast(root.split("\\"))
    }
    set = (name: string | Function) => {}
    get = (name?: string | undefined) => {}
    del = (name?: string) => {}
    add = (model: object) => {}
    read = (name?:string) => 
    fs.readdirSync(path.resolve(this.root,name?name:""))
    .map(subname=>new explorer(path.resolve(this.root,name?name:"",subname)))
}

export class otherObject implements other{
    root = "";
    name = "";
    type = "other";
    constructor(root:string){
        this.root = root;
        this.name = getLast(root.split("\\"))
    }
}

export function getObjectType(root:string){
    let name = getLast(root.split("\\"))
    if(is(name)==="file"){
        return new fileObject(root)
    }else if(is(name)==="dir"){
        return new dirObject(root)
    }else{
        return new otherObject(root)
    }
}