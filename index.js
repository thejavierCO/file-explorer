const {Root,dirModel} = require("./src/tools")
const {fileExplorer} = require("./src/index");

let main = new Root("./test/play");

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

console.log(main.remplace(-1,"init"));