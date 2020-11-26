import { create } from "../create";
export interface Iexplorer {
    root: string | undefined;
    type: string | undefined;
    name: string | undefined;
    get: (name: string) => any;
    set: (name: string) => any;
    read: (name?: string) => any;
    del: (name?: string) => any;
    add?: (model: create) => any;
    write?: (data: string) => Array<string> | string;
}
export declare class explorer implements Iexplorer {
    private _root;
    private _type;
    private _name;
    constructor(root: string);
    write?: ((data: string) => string | string[]) | undefined;
    get: (name: string) => void | explorer;
    set: (name: string) => void;
    read: () => string[] | explorer[];
    del: (name?: string | undefined) => void;
    add: (model: create) => void;
    get type(): string;
    get root(): string;
    get content(): any;
    set content(model: any);
    get name(): string | undefined;
}
//# sourceMappingURL=index.d.ts.map