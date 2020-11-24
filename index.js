const fileBrowser = require("./src/index")
let config = new fileBrowser("./play");

let main = config.explorer();

console.log(
    main.read(),
    main.set("play1")
)