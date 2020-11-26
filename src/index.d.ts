import { fileObject, dirObject } from "./tools";
import { create } from "./create";
import { explorer } from "./explorer";
export interface IfileExplorer {
    [x: string]: any;
    root: string;
    type: string;
    file?: fileObject | undefined;
    dir?: dirObject | undefined;
    create: (root: string) => create;
    explorer: () => explorer;
}
export declare class fileExplorer implements IfileExplorer {
    root: string;
    type: string;
    constructor(root?: string);
    create: (root: string) => create;
    explorer: () => explorer;
}
//# sourceMappingURL=index.d.ts.map