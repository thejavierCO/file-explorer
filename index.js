const {fileExplorer} = require("./src/index");

let admin = new fileExplorer();

console.log([
    admin.explorer().get("ts").get("explorer").get("index.ts").read(),
    // admin.create()
])