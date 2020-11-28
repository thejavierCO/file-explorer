import { root, type } from "./tools";
import { create } from "./create";
import { explorer } from "./explorer";
export interface IfileExplorer {
    root: root;
    type: type;
    isExist: boolean;
    create: (type: type) => create | ({
        file: () => create;
        dir: () => create;
    });
    explorer: explorer;
}
export declare class fileExplorer implements IfileExplorer {
    root: string;
    type: "dir" | "file";
    isExist: boolean;
    constructor(root?: string);
    get create(): (type: type) => create | {
        file: (name?: root) => create;
        dir: (name?: root) => create;
    };
    get explorer(): explorer;
}
//# sourceMappingURL=index.d.ts.map