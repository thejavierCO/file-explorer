const {Root,dirModel, fileModel} = require("./src/tools")
// const {create} = require("./src/create");
// const {explorer} = require("./src/explorer");
const {fileExplorer} = require("./src/index");

let main = new fileExplorer("test/play");

// main.content = `
//     <html>
//     <head>
//         <title><title>
//     </head>
//     <body>
//     </body>
//     </html>
// `

// main.writeLast("<flooter>init</flooter")
// main.name = "play.txt.init.play.config.json";
// main.content = "init.play.test.ahsdi.json";
console.log(main.explorer);