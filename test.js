let fb = require("./src/index");

let dir = new fb("./play/test");
let file = new fb("./play/text.txt");

console.log(dir.read(),file.read())
// home.set("testing");
// makedir.set((a)=>{
//     console.log(a)
// })
// console.log(
    // home.add(home.make("proyect1").set(a=>{
    //     a.set("make0").set(a=>{
    //         a.set("play0")
    //         a.set("play1")
    //     })
    //     a.set("make1").set(a=>{
    //         a.set("play0")
    //         a.set("play1")
    //     })
    // })),
    // home.make("file"),
    // home.make("dir").set((a)=>{
    //     a.set("init.txt")
    // }),
    // "\n",
    // home.make("file"),
    // "\n",
    // ,
    // "\n",
    // home.make("play.ts"),
    // "\n",
// )
// console.log('%c Success', 'color: green; font-size: 1.5em');