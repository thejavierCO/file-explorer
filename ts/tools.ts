import * as path from "path";
import * as fs from "fs";
// import {fileExplorer} from "./index";
// import {create} from "./create"
// import {explorer} from "./explorer"
// import { type } from "os";

export type root = string;

// export type modelContent = fileModel|dirModel;

// export type fileContent = Array<string>|string;

// export type dirContent = Array<explorer>|Array<create>;

export function getRoot(...root:Array<string>):string{
    return path.resolve(root.join("\\"))
}

export function existRoot(...root:Array<string>):boolean{
    return fs.existsSync(getRoot(root.join("\\")));
}

export function getTypeElement(element:root):"file"|"dir"{
    if(/[.]([\w\d]{0,})/i.test(element))return "file";
    else return "dir";
}

export function lastItem(element:Array<any>):any{
    return element[element.length-1];
}

// export function is(element:string):"file"|"dir"|"other"{
//     // element = lastItem(element.split("\\"));
//     // if(/([.]([\w\d]{0,}))/i.test(element))return "file";
//     // else if(!/([.]([\w\d]{0,}))/i.test(element))return "dir";
//     // else return "other";
// }

// export interface file{
//     // root:string|undefined;
//     // type:string|undefined;
//     // name:string|undefined;
//     // extension:string|undefined;
//     // content:fileContent;
//     // del:()=>any
// }

// export interface dir{
//     // root:string|undefined;
//     // type:string|undefined;
//     // name:string|undefined;
//     // content:dirContent;
//     // del:(name?:string)=>any
// }

// export class fileObject implements file{
//     // private _root:string|undefined;
//     // private _type:string|undefined;
//     // private _name:string|undefined;
//     // private _extension:string|undefined;
//     // constructor(exp:explorer|create){
//     //     this._type = "file";
//     //     this._root = exp.root;
//     //     this._name = lastItem(exp.root.split("\\"))
//     //     this._extension = lastItem(exp.root.split("\\")).split(".")[0]
//     // }
//     // private read=()=>{
//     //     if(typeof this.root === "string"&&existPath(this.root)){
//     //         return fs.readFileSync(this.root)
//     //         .toString()
//     //         .split("\n");
//     //     }else{
//     //         throw {error:"not exist root"}
//     //     }
//     // }
//     // get=(element:string)=>{
//     //     return this.content.filter(e=>e.indexOf(element)!==-1)
//     // }
//     // del=(name?:string)=>{}
//     // private write = ()=>{}
//     // private rename = ()=>{}
//     // get root(){
//     //     return this._root;
//     // }
//     // get type(){
//     //     return this._type;
//     // }
//     // get name(){
//     //     return this._name;
//     // }
//     // set name(newName){
//     //     console.log(newName,"rename");
//     // }
//     // get extension(){
//     //     return this._extension;
//     // }
//     // get content(){
//     //     return this.read();
//     // }
//     // set content(data){
//     //     console.log(data,"write")
//     // }
// }

// export class dirObject implements dir{
//     // private _root:string|undefined;
//     // private _type:string|undefined;
//     // protected _name:string|undefined;
//     // constructor(exp:explorer|create){
//     //     this._type = "dir";
//     //     this._root = exp.root;
//     //     this._name = lastItem(exp.root.split("\\"));
//     // }
//     // get=(name:string):explorer|Array<string>=>{
//     //     if(this.root){
//     //         let root = getRoot(this.root)
//     //         if(typeof name === "string"&&this.root){
//     //             root = getRoot(this.root,name)
//     //         }
//     //         if(existPath(root))return new explorer(root)
//     //         else throw {error:"not exist root",root}
//     //     }else{
//     //         throw {error:"not defined root"}
//     //     }
//     // }
//     // set(name:string|Function|create|explorer[]|string[]){
//     //     if(!this.root)throw{error:"not defined root"};
//     //     if(typeof name === "function")return name(this);
//     //     if(typeof name === "object"){
//     //         return console.log(name)
//     //     }else if(!existPath(getRoot(this.root,name))){
//     //         fs.mkdirSync(getRoot(this.root,name));
//     //         return this.get(name);
//     //     }else{
//     //         throw {error:"exist directory"}
//     //     }
//     // }
//     // read():dirContent{
//     //     if(this.root){
//     //         let root = getRoot(this.root)
//     //         return fs.readdirSync(root)
//     //         .map(e=>new explorer(getRoot(root,e)))
//     //     }else{
//     //         throw {error:"not defined root"}
//     //     }
//     // }
//     // del=(name?:string)=>{
//     //     if(!this.root)throw {error:"not defined root"}
//     //     if(name){
//     //         fs.rmdirSync(getRoot(this.root,name))
//     //     }else{
//     //         fs.rmdirSync(getRoot(this.root))
//     //     }
//     // }
//     // rename(newName:string){
//     //     if(typeof newName === "string"&&this.name&&typeof this.root === "string"){
//     //         if(!existPath(this.root.replace(this.name,newName))){
//     //             fs.renameSync(this.root,this.root.replace(this.name,newName));
//     //             this._root = this.root.replace(this.name,newName);
//     //             this._name = newName;
//     //         }else throw {error:"exist name directory"}
//     //     }else throw {error:"not set name with element type "+typeof newName}
//     // }
//     // get root(){
//     //     return this._root;
//     // }
//     // set root(newRoot){
//     //     if(typeof newRoot === "string")this._root = newRoot;
//     //     else throw {error:"require string"}
//     // }
//     // get type(){
//     //     return this._type;
//     // }
//     // get name(){
//     //     return this._name;
//     // }
//     // set name(newName){
//     //     if(typeof newName === "string")this.rename(newName)
//     // }
//     // get content(){
//     //     return this.read();
//     // }
//     // set content(data){
//     //     this.set(data);
//     // }
// }

// export class fileModel extends fileObject{
//     // constructor(root:explorer|create){
//     //     super(root);
//     //     this.content = [];
//     // }
// }

// export class dirModel extends dirObject{
//     // protected _content:dirContent;
//     // constructor(root:explorer|create){
//     //     super(root);
//     //     this._content = [];
//     //     this._name = root.name;
//     // }
//     // get(name:string){
//     //     if(this._content)
//     //     return this._content.toString()
//     // }
//     // set(name:Function|create){
//     //     if(typeof name !== "function"&&typeof name === "object"){
//     //         this._content.push(name);
//     //     }
//     //     console.log(name,this,"dirModel");
//     // }
//     // read(){return this._content}
//     // del(name?:string){
//     //     console.log(name,this);
//     // }
//     // rename(newName:string){
//     //     this._name = newName;
//     // }
// }

// export function getType(exp:explorer):fileObject|dirObject{
//     // if(!exp.type)throw {error:"not exist type"}
//     // if(exp.type==="file"){
//     //     return new fileObject(exp);
//     // }else if(exp.type==="dir"){
//     //     return new dirObject(exp);
//     // }else{
//     //     throw {error:"not exist type",data:exp}
//     // }
// }

// export function getTypeModel(exp:create):fileModel|dirModel{
//     // if(!exp.type)throw {error:"not exist type"}
//     // if(exp.type==="file"){
//     //     return new fileModel(exp);
//     // }else if(exp.type==="dir"){
//     //     return new dirModel(exp);
//     // }else{
//     //     throw {error:"not exist type",in:exp}
//     // }
// }