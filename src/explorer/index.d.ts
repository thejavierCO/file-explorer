import { dirObject, fileObject, fileContent, dirContent, root, type, name } from "../tools";
export interface Iexplorer {
    root: root;
    name: name;
    type: type;
    content: fileContent | dirContent | undefined;
    exist: boolean;
}
export declare class explorer implements Iexplorer {
    root: string;
    name: string;
    type: "dir" | "file";
    exist: boolean;
    constructor(root: root);
    protected info(type: type, root: root): fileObject | dirObject | undefined;
    get content(): fileContent | dirContent | undefined;
}
//# sourceMappingURL=index.d.ts.map