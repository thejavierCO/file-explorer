import {getLast,is,getObjectType} from "../tools"
import * as path from "path";
import {Icreate} from "../../Types/elements";
import explorer from "../explorer";

class create implements Icreate{
    constructor(root:string){
        root = path.join(root);
    }
}

export default create;