import * as path from "path";
import * as fs from "fs";
import {fileExplorer} from "./index";
import {create} from "./create"
import {explorer} from "./explorer"

export function getRoot(...name:Array<string>){
    let root = name.join("/");
    return path.resolve(root)
}

export function existPath(root:string=getRoot()){
    return fs.existsSync(root)
}

export function lastItem(element:Array<string>){
    return element[element.length-1];
}

export function is(element:string){
    element = lastItem(element.split("\\"));
    if(/([.]([\w\d]{0,}))/i.test(element))return "file";
    else return "dir";
}

export interface file{
    root:string|undefined
    type:string|undefined
    name:string|undefined
    extension:string|undefined
    get:(name:string)=>any
    set:(name:string)=>any
    read:(name?:string)=>any
    del:(name?:string)=>any
    add:(model:create)=>any
}

export interface dir{
    root:string|undefined
    type:string|undefined
    name:string|undefined;
    get:(name:string)=>any
    set:(name:string)=>any
    read:()=>any
    del:(name?:string)=>any
    add:(model:create)=>any
}

export class fileObject implements file{
    root:string|undefined
    type:string|undefined
    name:string|undefined;
    extension:string|undefined
    constructor(exp:explorer|create){
        this.type = "file";
        this.root = exp.root;
        this.name = lastItem(exp.root.split("\\"))
        this.extension = lastItem(exp.root.split("\\")).split(".")[0]
    }
    get=(name:string)=>{}
    set=(name:string)=>{}
    read=()=>{
        if(existPath(this.root)&&this.root){
            return fs.readFileSync(this.root)
            .toString()
            .split("\n");
        }else{
            throw {error:"not exist rooot"}
        }
    }
    del=(name?:string)=>{}
    add=(model:create)=>{}
}

export class dirObject implements dir{
    root:string|undefined
    type:string|undefined
    name:string|undefined;
    constructor(exp:explorer|create){
        this.type = "dir";
        this.root = exp.root;
        this.name = lastItem(exp.root.split("\\"));
    }
    get=(name:string)=>{
        if(this.root){
            let root = getRoot(this.root)
            if(typeof name === "string"&&this.root){
                root = getRoot(this.root,name)
            }
            if(existPath(root))return new explorer(root)
            else throw {error:"not exist root",root}
        }else{
            throw {error:"not defined root"}
        }
    }
    set=(name:string)=>{
        console.log(this.get(name))
    }
    read=()=>{
        if(this.root){
            let root = getRoot(this.root)
            return fs.readdirSync(root)
            .map(e=>new explorer(getRoot(root,e)))
        }else{
            throw {error:"not defined root"}
        }
    }
    del=(name?:string)=>{
        console.log(name,"del")
    }
    add=(model:create)=>{
        console.log(model,"add")
    }
}

export class fileModel extends fileObject{
    constructor(root:explorer|create){
        super(root);
    }
}

export class dirModel extends dirObject{
    constructor(root:explorer|create){
        super(root);
    }
}

export function getType(exp:explorer){
    if(!exp.type)throw {error:"not exist type"}
    if(exp.type==="file"){
        return new fileObject(exp);
    }else if(exp.type==="dir"){
        return new dirObject(exp);
    }else{
        throw {error:"not exist type",data:exp}
    }
}

export function getTypeModel(exp:create){
    if(!exp.type)throw {error:"not exist type"}
    if(exp.type==="file"){
        return new fileModel(exp);
    }else if(exp.type==="dir"){
        return new dirModel(exp);
    }else{
        throw {error:"not exist type",in:exp}
    }
}