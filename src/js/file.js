let path = require("path");
let fs = require("fs");

class File {
  constructor(name, ruta) {
    this._name = name
    this._data = Buffer.from('')
    this._ruta = path.join(ruta,name);
    if(fs.existsSync(this._ruta))this._data = fs.readFileSync(this._ruta);
  }
  get name() {
    return this._name
  }
  set name(n) {
    this._name = n
  }
  set data(data) {
    if (fs.existsSync(path.resolve(this._ruta)))fs.writeFileSync(path.resolve(this._ruta), data)
    this._data = Buffer.from(data)
  }
  get data() {
    return this._data
  }
}

module.exports = File;