import * as path from "path";
import * as fs from "fs";
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
}
// --------------------------------------Utitlidades----------------------------------

export function getTypeElement(element:root):"file"|"dir"{
    if(!element)throw {error:"not defined root"}
    if(/[.]([\w\d]{0,})/i.test(element))return "file";
    else return "dir";
}

export function ObjectType(type:type,root:root):fileObject|dirObject|undefined{
    if(!root)throw {error:"require root"};
    else if(!type)return undefined;
    else if(type==="dir")return new dirObject(root)
    else if(type==="file")return new fileObject(root)
};

// --------------------------------------Class----------------------------------

export class Root implements rootInstance{
    private _root:root = "./";
    constructor(root?:root){
        if(this.isRoot(root))
        this._root = this.setRoot(root);
        else if(this.isRoot("./"+root))
        this._root = this.setRoot("./"+root);
        else throw {error:"not is root",root}
    }
    public isRoot(element:root|Array<root>):boolean{
        if(typeof element === "string"){
            if(/\//g.test(element))return true;
            else if(/(\\)/g.test(element))return true;
            else return false
        }else if(Array.isArray(element)){
            return this.isRoot(element.join("\\"))
        }else{
            return false;
        }
    }
    public getRoot(...root:Array<string|undefined>):string{return this.setRoot(root)};
    public existRoot(...root:Array<root>):boolean{return fs.existsSync(this.getRoot(root.join("\\")))};
    public setRoot(element:root|Array<root>):string{
        if(typeof element === "string"){
            if(/\//g.test(element))
            return this.setRoot(element.split("/"));
            else if(/(\\)/g.test(element))
            return this.setRoot(element.split("\\"));
            else throw {error:"not is root",root:element}
        }else if(Array.isArray(element)){
            return path.resolve(element.join("\\"));
        }else{
            throw {error:"not convert root",data:element}
        }
    }
    public toRoot(element:root|Array<root>):string{
        if(typeof element === "string"){
            if(/\//g.test(element))
            return this.toRoot(element.split("/"));
            else if(/(\\)/g.test(element))
            return this.toRoot(element.split("\\"));
            else throw {error:"not is root"}
        }else if(Array.isArray(element)){
            return element.join("\\");
        }else{
            throw {error:"not convert root"}
        }
    }
    public remplace(posicion:number,element:string):Root{
        if(!element)throw{error:"not defined element to remplace"}
        if(posicion<=-1){
            if(posicion<(0-this.length))return this.remplace(this.length+1,element)
            else return this.remplace(this.length-(0-posicion),element);
        }else if(posicion>this.length){
            throw {error:"not exist element"}
        }else return new Root(
            this.elements.map((a,b)=>b===posicion?element:a).join("\\")
        );
    }
    public get(posicion:number):string|undefined{return posicion<=-1?
        posicion<(0-this.length)?undefined:this.get(this.length-(0-posicion))
    :this.elements[posicion]}
    public push(name:string){
        if(typeof name !== "string")throw {error:"require string for root"}
        const base = this.elements;base.push(name);
        this._root = base.join("\\");return this.root;
    }
    public pop(posicion:number){
        if(posicion)return this.filter((a,b,c)=>b!==(posicion<=-1?(this.length-(0-posicion)):posicion))
        const base = this.elements;
        base.pop();
        this._root = base.join("\\");
        return this.root;
    }
    public shift(){
        const base = this.elements;
        base.shift();
        this._root = base.join("\\");
        return this.root;
    }
    public concat(elements:string){return path.join(this.root||"",(this.isRoot(elements)?this.toRoot(elements):""))}
    public filter(condicion:(posicion:string,index:number,array:object)=>boolean){return this.elements.filter(condicion).join("\\")}
    public map(condicion:(posicion:string,index:number,array:object)=>any):string{return this.elements.map(condicion).join("\\")}
    public includes(element:string,fromIndex?:number|undefined):boolean{return  this.elements.includes(element,fromIndex)}
    public slice(start:number,end:number){return this.elements.slice(start,end)};
    get root(){
        return this._root;
    }
    set root(root){
        if(!root)throw {error:"not defined root"}
        if(this.isRoot(root)){
            this._root = this.setRoot(root);
        }else throw {error:"not is root"}
    }
    get elements(){
        if(!this._root)throw {error:"not defined root"}
        return this._root.split("\\")
    }
    get length(){
        return this.elements.length;
    }
    get exist(){
        if(!this._root)throw {error:"not defined root"}
        return this.existRoot(this.root);
    }
}

export class fileModel extends Root implements file{   
    //-------- values
    protected _name:string|undefined;
    protected _content:fileContent;
    protected _extencion:string|undefined;
    type:"file"="file";
    //-------- constructor

    constructor(root:root){
        super(root);
        if(!this.root)throw {error:"not defined root"}
        this._name = this.getName().name;
        this._extencion = this.getName().extension;
        this._content = [];
    }
    //-------- methods
    protected getName(root?:root):{name:string,extension:string}{
        if(!root)return this.getName(this.root);
        else return {
            name:root
            .split("\\")[root.split("\\").length-1]
            .split(".")
            .filter((a,b,c)=>b!==c.length-1)
            .join("."),
            extension:root
            .split("\\")[root.split("\\").length-1]
            .split(".")
            .filter((a,b,c)=>b===c.length-1)
            .join("")
        }
    }
    protected read(){return this._content}
    protected rename(newName:string){
        this.root = this.remplace(-1,newName).root;
        this.extension = this.getName(this.concat(newName)).extension;
        return this.getName(this.concat(newName)).name;
    }
    protected write(data:fileContent|string){
        if(typeof data === "string")return data.split("\n");
        else if(Array.isArray(data))return data;
        else return [new String(data)]
    }
    writeLast(...data:fileContent){
        data.map(e=>this._content.push(e));
        return this.content;
    }

    //-------- getters and setters
    
    get extension(){
        return this._extencion;
    }
    set extension(a){
        this._extencion = a;
    }
    get content(){
        return this._content = this.read();
    }
    set content(data){
        this._content = this.write(data);
    }
    get name(){
        return this.getName(this.root).name;
    }
    set name(a){
        if(!a)throw{error:"not defined name"}
        this._name = this.rename(a);
    }
}
export class dirModel extends Root implements dir{

    //-------- values
    
    _name = "";
    type:"dir"="dir";
    _content:dirContent;

    //-------- constructor
    
    constructor(root:root){
        super(root);
        if(!this.root)throw {error:"not defined root"}
        this._name = this.getName()
        this._content = [];
    }

    //-------- methods
    protected getName(root?:root):string{
        if(!root)return this.getName(this.root);
        else return root
        .split("\\")[root.split("\\").length-1]
    }
    protected read(){return this._content;}
    protected add(data:dirContent){
        if(typeof data === "object"){
            this.content.push(data);
            return data;
        }else throw {error:"not is explorer or create"}
    }
    protected rename(newName:string){
        this.root = this.remplace(-1,newName).root;
        return this.getName(newName);
    }
    protected write(data:dirContent){
        if(typeof data === "object")return data;
        else throw {error:"not is explorer or create"}
    }

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
        this._content = this.write(data);
    }
    get name(){
        return this._name;
    }
    set name(a){
        this._name = this.rename(a);
    }
}

export class fileObject extends fileModel implements model{
    constructor(root:string){
        super(root);
    }
    protected read(){
        if(!this.root)throw {error:"not defined root"};
        if(this.exist)return fs.readFileSync(this.root,{}).toString().split("\n")
        else return this._content;
    }
    writeLast(data:fileContent|string){
        let content = data;
        if(typeof data === "string")content = data.split("\n");
        content = this.content.concat(content).join("\n")
        return this.content = [content];
    }
    protected rename(newName:string){
        if(!this.root)throw {error:"not defined root"};
        if(this.exist){
            let newRoot = this.remplace(-1,newName).root;
            if(newRoot)fs.renameSync(this.root,newRoot);
            else throw {error:"not create newRoot"}
            this._name = this.getName(newRoot).name;
            this._extencion = this.getName(newRoot).extension;
            this.root = newRoot;
            return newName;
        }else return newName;
    }
    protected write(data:fileContent){
        if(!this.root)throw {error:"not defined root"};
        let content = Array.isArray(data)?data.join("\n"):data;
        if(this.exist){
            fs.writeFileSync(this.root,content)
            return this.read();
        }else return data;
    }
}

export class dirObject extends dirModel implements model{
    constructor(root:string){
        super(root);
    }
    protected read(){
        if(!this.root)throw {error:"not defined root"};
        if(this.exist){
            return fs.readdirSync(this.root)
            .map((e:string)=>new explorer(e))
        }else{
            return this._content.map((e:explorer|create)=>new create(e.data));
        }
    }
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