import * as path from "path";
import * as fs from "fs";
import {fileExplorer} from "./index";
import {create} from "./create";
import {explorer} from "./explorer";

export type root = string|undefined;

export type type = "dir"|"file"|undefined;

export type name = string;

export function getRoot(...root:Array<string|undefined>):string{
    return toRoot(root);
}

export function existRoot(...root:Array<string>):boolean{
    return fs.existsSync(getRoot(root.join("\\")));
}

export function getTypeElement(element:root):"file"|"dir"{
    if(!element)throw {error:"not defined root"}
    if(/[.]([\w\d]{0,})/i.test(element))return "file";
    else return "dir";
}

export function lastItem(element:Array<any|undefined|null>){
    if(Array.isArray(element))return element[element.length-1];
    else throw {error:"require array"}
}

export function toRoot(element:root|Array<root>):string{
    if(typeof element === "string"){
        if(/\//g.test(element))
        return path.resolve(element.split("/").join("\\"));
        else if(/(\\)/g.test(element))
        return path.resolve(element.split("/").join("\\"));
        else throw {error:"not is root"}
    }else if(Array.isArray(element)){
        return path.resolve(element.join("\\"));
    }else{
        throw {error:"not convert root"}
    }
}

export function rootSplit(element:root|Array<root>):Array<string|root>{
    if(typeof element === "string"){
        if(/\//g.test(element))
        return element.split("/");
        else if(/(\\)/g.test(element))
        return element.split("\\");
        else throw {error:"not is root"}
    }else if(Array.isArray(element)){
        return element;
    }else{
        throw {error:"not convert root"}
    }
}

export function ObjectType(type:type,root:root):fileObject|dirObject|undefined{
    if(!root)throw {error:"require root"}
    else if(!type)return undefined;
    else if(type==="dir")return new dirObject(root)
    else if(type==="file")return new fileObject(root)
};

export type fileContent = Array<string>

export type file = {
    root:root
    name:string
    type:"file"
    extension:string|undefined;
    content:fileContent
}

export type dirContent = Array<explorer|create>

export type dir = {
    root:root
    name:string
    type:"dir"
    content:dirContent
}

export class fileFactory implements file{
    _root = "";
    _name = "";
    type:"file"="file";
    extension;
    protected _content:fileContent;
    constructor(root:root=""){
        this._root = getRoot(root);
        this._name = lastItem(rootSplit(this._root))
        this.extension = this.getExtension();
        this._content = [];
    }
    protected getExtension(){
        let get = this.name.split(".");
        if(get.length>1){
            return get[get.length-1];
        }else{
            return undefined;
        }
    }
    protected read(){
        return this._content;
    }
    protected writeLast(data:fileContent){
        data.map(e=>{
            this.content.push(e);
        })
        return this.content;
    }
    protected rename(newName:string){
        return newName;
    }
    protected write(data:fileContent){
        return data;
    }
    get content(){
        return this._content = this.read();
    }
    set content(data){
        this._content = this.write(data);
    }
    get root(){
        return this._root;
    }
    set root(a){
        this._root = a;
    }
    get name(){
        return this._name;
    }
    set name(a){
        this._name = this.rename(a);
    }
}
export class dirFactory implements dir{
    _root = "";
    _name = "";
    type:"dir"="dir";
    _content:dirContent
    constructor(root:root){
        this.root = getRoot(root);
        this.name = lastItem(rootSplit(this.root))
        this._content = [];
    }
    protected read(){return this._content;}
    protected add(data:dirContent){
        return data;
    }
    protected rename(newName:string){
        return newName;
    }
    protected del(name:string){
        console.log(this.existElement(name))
    }
    protected get(name:string){
        if(existRoot(getRoot(this.root,name))){
            this.content.push(new explorer(getRoot(this.root,name)));
        }else{
            this.content.push(new create(getRoot(this.root,name)));
        }
    }
    protected set(name:string){
        if(!existRoot(getRoot(this.root,name))){
            this.content.push(new explorer(getRoot(this.root,name)));
        }else{
            this.content.push(new create(getRoot(this.root,name)));
        }
    }
    protected existElement(name:string){
        let get = this.content.filter((e:explorer|create)=>e.name===name);
        if(get.length>1){
            return true;
        }else{
            return false;
        }
    }
    get content(){
        return this.read();
    }
    set content(data){
        this._content = this.add(data);
    }
    get root(){
        return this._root;
    }
    set root(a){
        this._root = a;
    }
    get name(){
        return this._name;
    }
    set name(a){
        this._name = this.rename(a);
    }
}

export type model = {
    isExist:boolean
}

export class fileObject extends fileFactory implements model{
    isExist = false;
    constructor(root:string){
        super(root);
        this.isExist = existRoot(root);
    }
    protected read(){
        if(this.isExist)return fs.readFileSync(this.root).toString().split("\n")
        else return this._content;
    }
    writeLast(data:fileContent|string){
        let content = data;
        if(typeof data === "string")content = data.split("\n");
        content = this.content.concat(content).join("\n")
        return this.content = [content];
    }
    protected rename(newName:string){
        if(this.isExist){
            let newRoot = this.root.replace(this.name,newName);
            fs.renameSync(this.root,newRoot);
            this._name = newName;
            this._root = this._root;
            return newName;
        }else return newName;
    }
    protected write(data:fileContent){
        let content = Array.isArray(data)?data.join("\n"):data;
        if(this.isExist){
            fs.writeFileSync(this.root,content)
            return this.read();
        }else return data;
    }
}

export class dirObject extends dirFactory implements model{
    isExist = false;
    constructor(root:string){
        super(root);
        this.isExist = existRoot(root);
    }
    protected read(){
        if(this.isExist){
            return fs.readdirSync(this.root)
            .map((e:string)=>new explorer(e))
        }else{
            return this._content.map((e:explorer|create)=>new create(e.root));
        }
    }
    protected del(name:string){
        console.log(this.existElement(name))
    }
    protected get(name:string){
        console.log(this.existElement(name))
    }
    protected set(name:string){
        console.log(this.existElement(name))
    }
    protected add(data:dirContent){
        return data;
    }
    protected rename(newName:string){
        if(this.isExist){
            let newRoot = this.root.replace(this.name,newName);
            fs.renameSync(this.root,newRoot);
            this._name = newName;
            this._root = this._root;
            return newName;
        }else return newName;
    }
}