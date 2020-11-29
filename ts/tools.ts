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

export type rootInstance = {

}

export type model = {
    isExist:boolean
}
// --------------------------------------Utitlidades----------------------------------

export function getTypeElement(element:root):"file"|"dir"{
    if(!element)throw {error:"not defined root"}
    if(/[.]([\w\d]{0,})/i.test(element))return "file";
    else return "dir";
}

export function lastItem(element:Array<any|undefined|null>){
    if(Array.isArray(element))return element[element.length-1];
    else throw {error:"require array"}
}


// let fragmanetRootMethods = (result:Array<any>):fragmanetMethodsResult=>({
//     result:result,
//     last:result[result.length-1],
//     first:result[0],
//     filter:result.filter,
//     remplaceLast:(name:string)=>result.filter((_,b,c)=>b!==c.length-1).join("//")+name
// })

// export function fragmanetRoot(element:root|Array<root>):fragmanetMethodsResult{
//     if(typeof element === "string"){
//         if(/\//g.test(element))
//         return fragmanetRoot(element.split("/"));
//         else if(/(\\)/g.test(element))
//         return fragmanetRoot(element.split("\\"));
//         else throw {error:"not is root"}
//     }else if(Array.isArray(element)){
//         return fragmanetRootMethods(element);
//     }else{
//         throw {error:"not fragment root"}
//     }
// }

export function ObjectType(type:type,root:root):fileObject|dirObject|undefined{
    if(!root)throw {error:"require root"};
    else if(!type)return undefined;
    else if(type==="dir")return new dirObject(root)
    else if(type==="file")return new fileObject(root)
};

// --------------------------------------Class----------------------------------

export class Root implements rootInstance{
    private _root:string = "./";
    constructor(root:root){
        if(!root)throw {error:"not defined root"}
        if(this.isRoot(root)){
            this._root = this.setRoot(root);
        }else throw {error:"not is root"}
    }
    public isRoot(element:root|Array<root>):boolean{
        if(typeof element === "string"){
            if(/\//g.test(element))
            return true;
            else if(/(\\)/g.test(element))
            return true
            else return false
        }else if(Array.isArray(element)){
            return this.isRoot(element.join("\\"))
        }else{
            return false;
        }
    }
    public getRoot = (...root:Array<string|undefined>):string=>this.setRoot(root);
    public existRoot = (...root:Array<string>):boolean=>fs.existsSync(this.getRoot(root.join("\\")));
    public setRoot = (element:root|Array<root>):string=>{
        if(typeof element === "string"){
            if(/\//g.test(element))
            return this.setRoot(element.split("/"));
            else if(/(\\)/g.test(element))
            return this.setRoot(element.split("\\"));
            else throw {error:"not is root"}
        }else if(Array.isArray(element)){
            return path.resolve(element.join("\\"));
        }else{
            throw {error:"not convert root"}
        }
    }
    public remplace = (posicion:number,element:string):Root=>{
        if(posicion>this.length){
            throw {error:"not exist posicion"}
        }else if(posicion<this.length){
            console.log(this.length,posicion,posicion-this.length)
        }
        // if(posicion<0)return this.remplace(this.length-posicion,element)
        // else if(posicion===0)throw {error:"not use posicion 0"}
        // else if(posicion>this.length)throw {error:"not exist posicion"}
        // else return new Root(
        //     this.elements.map((a,b)=>b===posicion?element:a).join("\\")
        // );
    }
    public get = (posicion:number):string=>this.elements[posicion];
    get root(){
        return this._root;
    }
    get elements(){
        return this._root.split("\\")
    }
    get length(){
        return this.elements.length;
    }
    get exist(){
        return this.existRoot(this.root);
    }
}

export class fileModel extends Root implements file{   
    //-------- values
    // protected _name:string|undefined;
    // protected _content:fileContent;
    // protected _extencion:string|undefined;
    // type:"file"="file";
    //-------- constructor

    constructor(root:root){
        super(root);
        // this.name = root;
        // this.extension = root;
        // this._content = [];
    }
    //-------- methods
    // protected getExtension(name?:string):string|undefined{}
    // protected getName(root?:root):{name:string,extension:string}{
    //     if(isRoot(root)){
    //         return {
    //             name:fragmanetRoot(root).last,
    //             extension:fragmanetRoot(root).last.split(".")[0]
    //         }
    //     }else throw {error:"not is root"}
    // }
    // protected read(){return this._content}
    // protected rename(newName:string){return newName;}
    // protected write(data:fileContent|string){
    //     if(typeof data === "string")return data.split("\n");
    //     else if(Array.isArray(data))return data;
    //     else return [new String(data)]
    // }
    // protected newRoot(root:root){
    //     if(isRoot(root))return root;
    //     else throw {error:"not is root"}
    // }
    // writeLast(...data:fileContent){
    //     data.map(e=>this._content.push(e));
    //     return this.content;
    // }

    //-------- getters and setters
    
    // get extension(){
    //     // return this._extencion;
    // }
    // set extension(a){
    //     // console.log(a)
    //     // this._extencion = this.getName(a).extension;
    // }
    // get content(){
    //     // return this._content = this.read();
    // }
    // set content(data){
    //     // this._content = this.write(data);
    // }
    // get root(){
    //     // return this._root;
    // }
    // set root(a){
    //     // this._root = getRoot(this.newRoot(a));
    // }
    // get name(){
    //     // return this.getName(this.root).name;
    // }
    // set name(a){
    //     // if(!a)throw{error:"not defined name"}
    //     // this.root = fragmanetRoot(this.root).remplaceLast(a);
    //     // this.extension = this.root;
    //     // this._name = this.rename(a);
    // }
}
export class dirModel extends Root implements dir{

    //-------- values
    
    _name = "";
    type:"dir"="dir";
    _content:dirContent;

    //-------- constructor
    
    constructor(root:root){
        super(root);
        // this.name = this.get(-1);
        // this._content = [];
    }

    //-------- methods
    
    // protected read(){return this._content;}
    // protected add(data:dirContent){return data;}
    // protected rename(newName:string){return newName;}

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
    
    // get content(){
    //     return this.read();
    // }
    // set content(data){
    //     this._content = this.add(data);
    // }
    // get root(){
    //     return this._root;
    // }
    // set root(a){
    //     this._root = a;
    // }
    // get name(){
    //     return this._name;
    // }
    // set name(a){
    //     this._name = this.rename(a);
    // }
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