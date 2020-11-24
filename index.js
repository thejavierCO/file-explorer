const fileBrowser = require("./src/index")
let config = new fileBrowser("./");

let main = config.explorer();

console.log(
    main.read(),
    main.read("ts")
)