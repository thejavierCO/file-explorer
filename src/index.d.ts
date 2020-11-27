import { root } from "./tools";
import { create } from "./create";
import { explorer } from "./explorer";
export interface IfileExplorer {
    root: root | string | undefined;
    type: "file" | "dir" | "other" | undefined;
    create: (name: string) => create;
    explorer: explorer;
}
export declare class fileExplorer implements IfileExplorer {
    root: string;
    type: "file" | "dir" | "other";
    constructor(root?: string);
    private _create;
    private _explorer;
    get create(): (name: string) => create;
    get explorer(): explorer;
}
//# sourceMappingURL=index.d.ts.map