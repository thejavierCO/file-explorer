let fb = require("./src/index");

console.log(
    (new fb("./src")),
    (new fb("./src/index.js").read())
)