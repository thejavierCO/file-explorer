import * as path from "path";
import * as fs from "fs";
import file from "../tools/origin/file";
import dir from "../tools/origin/dir";
import is from "../tools/is";
import lastElement from "../tools/lastElement";
import Ifb from "../Types/fileBrowser"
import Ifs from "../Types/fileSystem"

class fileBrowser implements Ifb{
    constructor(root:string=path.resolve("./")){
        root = path.resolve(is(root,false)==="string"?root:"./");
        if(fs.existsSync(path.resolve(typeof root === "string"?root:"./"))){
            if(is(lastElement(root.split("\\")))==="file"){
                return new file(root);
            }else if(is(lastElement(root.split("\\")))==="dir"){
                return new dir(root);
            }
        }else{
            throw {error:"not exist root "+path.resolve(root?root:"./")}
        }
    }
}

export default fileBrowser;