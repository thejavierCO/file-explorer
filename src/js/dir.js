let path = require("path");
let fs = require("fs");
let File = require("./file");

class Dir {
  constructor(ruta="temp") {
    this._router = path.resolve(ruta)
    this._exist = fs.existsSync(this._router);
  }
  getFile(name) {
    return new File(name,this._router)
  }
}

module.exports = Dir;