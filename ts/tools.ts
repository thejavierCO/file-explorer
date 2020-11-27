import * as path from "path";
import * as fs from "fs";
import {fileExplorer} from "./index";
import {create} from "./create"
import {explorer} from "./explorer"

export function getRoot(...name:Array<string>){
    // let root = name.join("/");
    // return path.resolve(root)
}

export function existPath(root:string=getRoot()){
    // return fs.existsSync(root)
}

export function lastItem(element:Array<string>){
    // return element[element.length-1];
}

export function is(element:string){
    // element = lastItem(element.split("\\"));
    // if(/([.]([\w\d]{0,}))/i.test(element))return "file";
    // else return "dir";
}

export interface file{
    // root:string|undefined
    // type:string|undefined
    // name:string|undefined
    // extension:string|undefined
    // get:(name:string)=>any
    // set:(name:string|Function)=>any
    // read:(name?:string)=>any
    // del:(name?:string)=>any
    // add:(model:create)=>any
}

export interface dir{
    // root:string|undefined
    // type:string|undefined
    // name:string|undefined;
    // get:(name:string)=>any
    // set:(name:string|Function)=>any
    // read:()=>any
    // del:(name?:string)=>any
    // add:(model:create)=>any
}

export class fileObject implements file{
    // private _root:string|undefined
    // private _type:string|undefined
    // private _name:string|undefined;
    // private _extension:string|undefined
    // constructor(exp:explorer|create){
    //     this._type = "file";
    //     this._root = exp.root;
    //     this._name = lastItem(exp.root.split("\\"))
    //     this._extension = lastItem(exp.root.split("\\")).split(".")[0]
    // }
    // get=(name:string)=>{}
    // set=(name:string|((data:any)=>any),data:string)=>{
    //     if(!this.root)throw {error:"not defined root"}
    //     if(!name)throw {error:"not defined name"}
    //     if(typeof name === "function")return name(this)?"true":"false";
    //     fs.appendFileSync(getRoot(this.root,name),data);
    //     return "";
    // }
    // read=()=>{
    //     if(existPath(this.root)&&this.root){
    //         return fs.readFileSync(this.root)
    //         .toString()
    //         .split("\n");
    //     }else{
    //         throw {error:"not exist rooot"}
    //     }
    // }
    // del=(name?:string)=>{}
    // add=(model:create)=>{}
    // get root(){
    //     return this._root;
    // }
    // get type(){
    //     return this._type;
    // }
    // get name(){
    //     return this._name;
    // }
    // get extension(){
    //     return this._extension;
    // }
    // get content(){
    //     return this.read();
    // }
    // set content(data){
    //     console.log(data)
    //     if(!this.root)throw {error:"not defined root file"}
    //     else if(!data)throw {error:"not defined root file"}
    //     // else fs.writeFileSync(this.root,data[0])
    // }
}

export class dirObject implements dir{
    // private _root:string|undefined
    // private _type:string|undefined
    // private _name:string|undefined;
    // constructor(exp:explorer|create){
    //     this._type = "dir";
    //     this._root = exp.root;
    //     this._name = lastItem(exp.root.split("\\"));
    // }
    // get=(name:string)=>{
    //     if(this.root){
    //         let root = getRoot(this.root)
    //         if(typeof name === "string"&&this.root){
    //             root = getRoot(this.root,name)
    //         }
    //         if(existPath(root))return new explorer(root)
    //         else throw {error:"not exist root",root}
    //     }else{
    //         throw {error:"not defined root"}
    //     }
    // }
    // set=(name:string|Function)=>{
    //     if(!this.root)throw{error:"not defined root"};
    //     if(typeof name === "function")return name(this);
    //     if(!existPath(getRoot(this.root,name))){
    //         fs.mkdirSync(getRoot(this.root,name));
    //         return this.get(name);
    //     }else{
    //         throw {error:"exist directory"}
    //     }
    // }
    // read=()=>{
    //     if(this.root){
    //         let root = getRoot(this.root)
    //         return fs.readdirSync(root)
    //         .map(e=>new explorer(getRoot(root,e)))
    //     }else{
    //         throw {error:"not defined root"}
    //     }
    // }
    // del=(name?:string)=>{
    //     if(!this.root)throw {error:"not defined root"}
    //     if(name){
    //         fs.rmdirSync(getRoot(this.root,name))
    //     }else{
    //         fs.rmdirSync(getRoot(this.root))
    //     }
    // }
    // add=(model:create)=>{
    //     console.log(model,"add")
    // }
    // get root(){
    //     return this._root;
    // }
    // get type(){
    //     return this._type;
    // }
    // get name(){
    //     return this._name;
    // }
    // get content(){
    //     return this.read();
    // }
    // set content(data){
    //     console.log(data)
    //     if(!this.root)throw {error:"not defined root file"}
    //     else if(typeof data !== "string")throw {error:"not defined root file"}
    //     else fs.writeFileSync(this.root,data)
    // }
}

export class fileModel extends fileObject{
    // private _content:string;
    // constructor(root:explorer|create){
    //     super(root);
    //     this._content = "";
    // }
    // get content(){
    //     return this._content.split("\n")
    // }
    // set content(data){
    //     if(!this.root)throw {error:"not defined root file"}
    //     else if(typeof data !== "string")throw {error:"not defined root file"}
    //     else this._content = data;
    // }
}

export class dirModel extends dirObject{
    // constructor(root:explorer|create){
    //     super(root);
    // }
}

export function getType(exp:explorer){
    // if(!exp.type)throw {error:"not exist type"}
    // if(exp.type==="file"){
    //     // return new fileObject(exp);
    // }else if(exp.type==="dir"){
    //     return new dirObject(exp);
    // }else{
    //     throw {error:"not exist type",data:exp}
    // }
}

export function getTypeModel(exp:create){
    // if(!exp.type)throw {error:"not exist type"}
    // if(exp.type==="file"){
    //     // return new fileModel(exp);
    // }else if(exp.type==="dir"){
    //     return new dirModel(exp);
    // }else{
    //     throw {error:"not exist type",in:exp}
    // }
}