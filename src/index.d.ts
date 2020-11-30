import { root, type, Root } from "./tools";
import { create } from "./create";
import { explorer } from "./explorer";
export interface IfileExplorer {
    type: type;
    create: ({
        file: () => create;
        dir: () => create;
    });
    explorer: explorer;
}
export declare class fileExplorer extends Root implements IfileExplorer {
    type: "dir" | "file";
    constructor(root: root);
    create: {
        file: (name?: root) => create;
        dir: (name?: root) => create;
    };
    get explorer(): explorer;
}
//# sourceMappingURL=index.d.ts.map