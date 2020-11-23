import fb from "../FileBowser/index";
import Imake from "./make";
interface directory {
    root: string;
    name: string;
    type: string;
    make: Imake;
    read: (name: string) => Array<fb>;
}
export default directory;
