const {fileModel,dirModel} = require("./src/tools")
const {fileExplorer} = require("./src/index");

let main = new fileModel("./test/play");

main.content = `
    <html>
    <head>
        <title><title>
    </head>
    <body>
    </body>
    </html>
`

main.writeLast("<flooter>init</flooter")
// main.name = "play.txt.init.play.config.json";

console.log(main);