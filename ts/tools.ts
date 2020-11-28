import * as path from "path";
import * as fs from "fs";
import {fileExplorer} from "./index";
import {create} from "./create";
import {explorer} from "./explorer";

// --------------------------------------tipos----------------------------------

export type root = string|undefined;

export type type = "dir"|"file"|undefined;

export type name = string;

export type fileContent = Array<string|String>

export type dirContent = Array<explorer|create>

export type file = {
    root:root
    name:name|root;
    type:"file"
    extension:string|undefined;
    content:fileContent
}

export type dir = {
    root:root
    name:name|root;
    type:"dir"
    content:dirContent
}

// --------------------------------------Utitlidades----------------------------------

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

export function isRoot(element:root|Array<root>):boolean{
    if(typeof element === "string"){
        if(/\//g.test(element))
        return true;
        else if(/(\\)/g.test(element))
        return true
        else return false
    }else if(Array.isArray(element)){
        return isRoot(element.join("\\"))
    }else{
        return false;
    }
}

export function rootSplit(element:root|Array<root>):Array<root>{
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
    if(!root)throw {error:"require root"};
    else if(!type)return undefined;
    else if(type==="dir")return new dirObject(root)
    else if(type==="file")return new fileObject(root)
};

// --------------------------------------Class----------------------------------

export class fileModel implements file{
    
    //-------- values
    protected _root = "";
    protected _name:string|undefined;
    protected _content:fileContent;
    protected _extencion:string|undefined;
    type:"file"="file";
    //-------- constructor

    constructor(root:root){
        if(!root)throw {error:"require root"};
        this.root = root;
        this.name = root;
        this.extension = root;
        this._content = [];
    }
    
    //-------- methods
    protected getExtension(name?:string):string|undefined{
        if(!name)name = this.root;
        let get = name.split(".");
        if(get.length>1)return lastItem(get);
        else return undefined;
    }
    protected getName(root?:root):string|undefined{
        if(!root)return this.getName(this.root);
        if(typeof root === "string"){
            console.log(root)
            let name:string = lastItem(rootSplit(root));
            let extencion = name.split(".").filter((a,b,c)=>b!==c.length-1);
            if(extencion.length>0){
                name = extencion.join(".");
            }
            if(isRoot(name)){
                return undefined;
            }
            return name;
        }else throw {error:"require string"}
    }
    protected read(){return this._content;}
    protected rename(newName:string){return this.getName(getRoot(this._root,newName));}
    protected write(data:fileContent|string){
        if(typeof data === "string")return data.split("\n");
        else if(Array.isArray(data))return data;
        else return [new String(data)]
    }
    writeLast(...data:fileContent){
        data.map(e=>this.content.push(e));
        return this.content;
    }
    protected newRoot(root:root){
        if(!root)return this.root;
        return root;
    }

    //-------- getters and setters
    get extension(){
        return this._extencion;
    }
    set extension(a){
        this._extencion = this.getExtension(a);
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
        this._root = getRoot(this.newRoot(a));
    }
    get name(){
        return this.getName(this._name);
    }
    set name(a){
        if(!a)throw{error:"not defined name"}
        let base = this.root.split("\\").filter((_,b,c)=>b!==c.length-1)
        base.push(a);
        this.root = base.join("\\");
        this.extension = a;
        this._name = this.rename(a);
    }
}
export class dirModel implements dir{

    //-------- values
    
    _root = "";
    _name = "";
    type:"dir"="dir";
    _content:dirContent;

    //-------- constructor
    
    constructor(root:root){
        this.root = getRoot(root);
        this.name = lastItem(rootSplit(this.root))
        this._content = [];
    }

    //-------- methods
    
    protected read(){return this._content;}
    protected add(data:dirContent){return data;}
    protected rename(newName:string){return newName;}

    // protected del(name:string){
    //     console.log(this.existElement(name))
    // }
    // protected get(name:string){
    //     if(existRoot(getRoot(this.root,name))){
    //         this.content.push(new explorer(getRoot(this.root,name)));
    //     }else{
    //         this.content.push(new create(getRoot(this.root,name)));
    //     }
    // }
    // protected set(name:string){
    //     if(!existRoot(getRoot(this.root,name))){
    //         this.content.push(new explorer(getRoot(this.root,name)));
    //     }else{
    //         this.content.push(new create(getRoot(this.root,name)));
    //     }
    // }
    // protected existElement(name:string){
    //     let get = this.content.filter((e:explorer|create)=>e.name===name);
    //     if(get.length>1){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }

    //-------- getters and setters
    
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

export class fileObject extends fileModel implements model{
    isExist = false;
    constructor(root:string){
        super(root);
        this.isExist = existRoot(root);
    }
    // protected read(){
    //     if(this.isExist)return fs.readFileSync(this.root).toString().split("\n")
    //     else return this._content;
    // }
    // writeLast(data:fileContent|string){
    //     let content = data;
    //     if(typeof data === "string")content = data.split("\n");
    //     content = this.content.concat(content).join("\n")
    //     return this.content = [content];
    // }
    // protected rename(newName:string){
    //     if(this.isExist){
    //         let newRoot = this.root.replace(this.name,newName);
    //         fs.renameSync(this.root,newRoot);
    //         this._name = newName;
    //         this._root = this._root;
    //         return newName;
    //     }else return newName;
    // }
    // protected write(data:fileContent){
    //     let content = Array.isArray(data)?data.join("\n"):data;
    //     if(this.isExist){
    //         fs.writeFileSync(this.root,content)
    //         return this.read();
    //     }else return data;
    // }
}

export class dirObject extends dirModel implements model{
    isExist = false;
    constructor(root:string){
        super(root);
        this.isExist = existRoot(root);
    }
    // protected read(){
    //     if(this.isExist){
    //         return fs.readdirSync(this.root)
    //         .map((e:string)=>new explorer(e))
    //     }else{
    //         return this._content.map((e:explorer|create)=>new create(e.root));
    //     }
    // }
    // protected del(name:string){
    //     console.log(this.existElement(name))
    // }
    // protected get(name:string){
    //     console.log(this.existElement(name))
    // }
    // protected set(name:string){
    //     console.log(this.existElement(name))
    // }
    // protected add(data:dirContent){
    //     return data;
    // }
    // protected rename(newName:string){
    //     if(this.isExist){
    //         let newRoot = this.root.replace(this.name,newName);
    //         fs.renameSync(this.root,newRoot);
    //         this._name = newName;
    //         this._root = this._root;
    //         return newName;
    //     }else return newName;
    // }
}