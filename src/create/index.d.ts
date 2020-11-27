export interface Icreate {
    root: string | undefined;
    type: string | undefined;
    name: string | undefined;
}
export declare type optionsCreate = {
    name: string;
    type: "file" | "dir";
    content: string | Array<string>;
};
export declare class create implements Icreate {
    private _root;
    private _name;
    constructor(root: string);
    get type(): "file" | "dir" | "other";
    get root(): string;
    get content(): any;
    set content(data: any);
    get name(): any;
    set name(reName: any);
}
//# sourceMappingURL=index.d.ts.map