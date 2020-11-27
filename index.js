const {fileExplorer} = require("./src/index");

let admin = new fileExplorer("./test");

console.log([
    // admin.explorer.content = {
    //     name:"play",
    //     type:"file"
    // },
    admin.create("play").content = admin.create("testing")
])