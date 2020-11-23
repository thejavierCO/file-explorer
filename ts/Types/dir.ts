import * as fs from "fs"
import fb from "./fileBrowser"
import Ifb from "./fileSystem"
import Imake from "./make"

interface directory {
    root:string
    name:string
    type:string
    make:Imake
    read:(name:string)=>Array<fb>
}

export default directory;