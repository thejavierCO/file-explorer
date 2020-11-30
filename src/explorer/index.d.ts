import { dirObject, fileObject, root } from "../tools";
export interface Iexplorer {
    data: fileObject | dirObject | undefined;
}
export declare class explorer implements Iexplorer {
    data: fileObject | dirObject | undefined;
    constructor(root: root);
}
//# sourceMappingURL=index.d.ts.map