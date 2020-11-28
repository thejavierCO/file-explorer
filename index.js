let fb = require("./src/index");

let home = new fb("./");
let dir = new fb("./play/test");
let file = new fb("./play/text.txt");

// console.log(dir.read())
// home.set("testing");
// makedir.set((a)=>{
//     console.log(a)
// })

// home.add(home.make("proyect1").set(a=>{
//     a.set("del0").set(e=>{
//         e.set("p9").set(e=>{
//             e.set("init")
//         })
//         e.set("p0").set(e=>{
//             e.set("init")
//         })
//     })
//     a.set("del1").set(e=>{
//         e.set("p9").set(e=>{
//             e.set("init")
//         })
//         e.set("p0").set(e=>{
//             e.set("init")
//         })
//     })
// }))

console.log(home.get("proyect1").del({subdirectory:true}))
