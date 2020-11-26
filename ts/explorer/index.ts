import {existPath,getRoot,getType,is} from "../tools"
import {create} from "../create";

export interface Iexplorer{
    root:string|undefined
    type:string|undefined
    name:string|undefined
    get:(name:string)=>any
    set:(name:string)=>any
    read:(name?:string)=>any
    del:(name?:string)=>any
    add?:(model:create)=>any
    write?:(data:string)=>Array<string>|string
}


export class explorer implements Iexplorer{
    private _root;
    private _type;
    private _name;
    constructor(root:string){
        if(existPath(getRoot(root))){
            this._root = getRoot(root);
            this._type = is(root);
            this._name = this.name;
        }else{
            throw {error:"not exist root",root}
        }
    }
    write?: ((data: string) => string | string[]) | undefined;
    get = (name:string)=>{
        if(!name)throw {error:"not defined name",in:"get explorer"}
        else return getType(this).get(name);
    }
    set = (name:string)=>{
        if(!name)throw {error:"not defined name",in:"set explorer"}
        else return getType(this).set(name)
    }
    read = (name?:string)=>getType(this).read(name)
    del = (name?:string)=>getType(this).del(name)
    add = (model:create)=>{
        if(!model)throw {error:"not defined name",in:"set explorer"}
        else return getType(this).add(model)
    }
    get type(){
        return this._type;
    }
    get root(){
        return this._root;
    }
    get content(){
        return this.read();
    }
    set content(model:any){
        this.add(model);
    }
    get name(){
        return getType(this).name;
    }
}