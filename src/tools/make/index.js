const fileBase = require("./file");
const dirBase = require("./dir");

class make{
    constructor(type,name="temp",root){
        switch(type){
            case "file":
                root = root+"/"+name;
                return new fileBase(root);
            case "dir":
                root = root+"/"+name;
                return new dirBase(root);
            default:
                if(is(type)==="file"){
                    return new make("file",type,name);
                }else if(is(type)==="dir"){
                    return new make("dir",type,name);
                }
        }
    }
}

module.exports = make;