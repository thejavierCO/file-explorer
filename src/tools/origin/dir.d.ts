import IDir from "../../Types/dir";
import make from "../make/index";
import fb from "../../FileBowser/index";
declare class Dir implements IDir {
    root: string;
    name: string;
    type: string;
    make: typeof make;
    constructor(root: string);
    read(name?: string): fb[];
}
export default Dir;
