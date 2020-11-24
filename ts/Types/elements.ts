import create from "../tools/create/index"
import explorer from "../tools/explorer/index"
import {fileObject,dirObject,otherObject} from "../tools/tools"

export type fileSystem = Array<fileObject|dirObject|otherObject>

export type contentFile = string|Array<string>|Function

export type contentDir = Array<explorer>|fileSystem|Function

export type file = {
    name:string
    root:string
    type:string
    extencion:string
    content:contentFile
    set:(name:string|Function)=>create
    get:(name?:string)=>create
    del:(name:string)=>msg
    add:(model:object)=>create
    read:(options?: {
        encoding: "ascii" | "utf8" | "utf-8" | "utf16le" | "ucs2" | "ucs-2" | "base64" | "latin1" | "binary" | "hex" | undefined
   })=>contentFile
}

export type dir = {
    name:string
    root:string
    type:string
    content:contentDir
    set:(name:string)=>explorer
    get:(name?:string)=>explorer
    del:(name:string)=>msg
    add:(model:object)=>create
    read:(namedir:string)=>contentDir
}

export type other = {
    name:string
    root:string
    type:string
}

export type msg = {
    root:string
    status:boolean
    message:string
}

export type root = string;

export interface Icreate {
    type:string
    file?:fileObject
    dir?:dirObject
}

export interface Iexplorer {
    type:string
    file?:fileObject
    dir?:dirObject
    set:(name?:string)=>explorer
    get:(name?:string)=>explorer
    del:(name:string)=>msg
    add:(model:object)=>create
    read:(namedir:string)=>contentDir
    getName:()=>string
    getType:()=>file|dir
}

export interface Imain{
    root:string
    create:()=>create
    explorer:()=>explorer
}
// export type IcreateFile = {}

// export type IcreateDir = {}