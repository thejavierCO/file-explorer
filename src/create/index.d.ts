export interface Icreate {
    root: string | undefined;
    type: string | undefined;
    name: string | undefined;
    get: (name: string) => any;
    set: (name: string) => any;
    read: (name?: string) => any;
    del: (name?: string) => any;
    add: (model: create) => any;
}
export declare class create implements Icreate {
    root: string;
    type: string;
    name: string;
    constructor(root: string);
    get: (name: string) => void;
    set: (name: string) => void;
    read: (name?: string | undefined) => void;
    del: (name?: string | undefined) => void;
    add: (model: create) => void;
}
//# sourceMappingURL=index.d.ts.map