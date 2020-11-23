import IFile from "../../Types/file";
import make from "../make/index";
declare class File implements IFile {
    root: string;
    name: string;
    type: string;
    make: typeof make;
    constructor(root: string);
    read(): string[];
}
export default File;
