let path = require("path");
let fs = require("fs");
const Dir = require("./js/dir");
const File = require("./js/file");

class fileBrowser{
    constructor(root="./"){
        root = path.resolve(root)
        this._root = root;
        this._exist = fs.existsSync(root);
    }
    getDir(ruta){
        return fs.readdirSync(path.resolve(ruta)).map(e=>{
            let name = e;
            let router = path.resolve(ruta,e);
            try{
                fs.readdirSync(router);
            }catch(err){
                console.log("error")
            }
            return e;
        })
    }
    getDirectorys(){
        console.log(this.getDir(this._root))
        return new Dir(this._root);
    }
}

module.exports = fileBrowser;
