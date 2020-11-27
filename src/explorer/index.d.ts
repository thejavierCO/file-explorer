export interface Iexplorer {
    root: string | undefined;
    type: string | undefined;
    name: string | undefined;
    content: string[] | explorer[] | {
        get: () => undefined | explorer;
    } | undefined;
}
export declare class explorer implements Iexplorer {
    root: string;
    _name: string | undefined;
    type: "file" | "dir" | "other" | undefined;
    constructor(root: string);
    get content(): any;
    set content(data: any);
    get name(): any;
    set name(newName: any);
}
//# sourceMappingURL=index.d.ts.map