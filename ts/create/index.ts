import * as fs from "fs";
import {fileObject,dirObject, getTypeElement,root,type, ObjectType} from "../tools";

export function create(root:root |fileObject | dirObject | undefined,type?:type):fileObject | dirObject|undefined{
    if(typeof root === "object")return root;
    const data = ObjectType(type?type:getTypeElement(type),root);
    if(!data)throw {error:"not get data processing"}
    if(data.exist&&data.root){
        try{
            if(fs.readdirSync(data.root)){
                data.content = fs.readdirSync(data.root)
                return data;
            }
        }catch(err){
            if(err.code === "ENOTDIR"){
                return ObjectType("file",root);
            }else throw err;
        }
    }else return data;
}