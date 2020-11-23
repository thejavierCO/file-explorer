import Imake from "./make"

interface file {
    root:string
    name:string
    type:string
    make:Imake
    read:(name?:string)=>Array<string>
}

export default file;