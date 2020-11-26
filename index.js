const {fileExplorer} = require("./src/index");

let admin = new fileExplorer("./ts");

console.log([
    admin.explorer().read(),
    // admin.create()
])