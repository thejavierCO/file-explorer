const fileBase = require("../file");
const dirBase = require("../dir");
const is = require("../../tools/is");

class make{
    constructor(type,name="temp",root){
        switch(type){
            case "file":
                root = root+"/"+name;
                return new fileBase(root,make);
            case "dir":
                root = root+"/"+name;
                return new dirBase(root,make);
            default:
                if(is(type)==="file"){
                    return new make("file",type,name);
                }else if(is(type)==="dir"){
                    return new make("dir",type,name);
                }
        }
    }
}
exports.default = make;
