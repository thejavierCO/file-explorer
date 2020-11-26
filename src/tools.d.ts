import { create } from "./create";
import { explorer } from "./explorer";
export declare function getRoot(...name: Array<string>): string;
export declare function existPath(root?: string): boolean;
export declare function lastItem(element: Array<string>): string;
export declare function is(element: string): "file" | "dir";
export interface file {
    root: string | undefined;
    type: string | undefined;
    name: string | undefined;
    get: (name: string) => any;
    set: (name: string) => any;
    read: (name?: string) => any;
    del: (name?: string) => any;
    add: (model: create) => any;
}
export interface dir {
    root: string | undefined;
    type: string | undefined;
    name: string | undefined;
    get: (name: string) => any;
    set: (name: string) => any;
    read: (name?: string) => any;
    del: (name?: string) => any;
    add: (model: create) => any;
}
export declare class fileObject implements file {
    root: string | undefined;
    type: string | undefined;
    name: string | undefined;
    constructor(exp: explorer | create);
    get: (name: string) => void;
    set: (name: string) => void;
    read: (name?: string | undefined) => void;
    del: (name?: string | undefined) => void;
    add: (model: create) => void;
}
export declare class dirObject implements dir {
    root: string | undefined;
    type: string | undefined;
    name: string | undefined;
    constructor(exp: explorer | create);
    get: (name: string) => explorer;
    set: (name: string) => void;
    read: () => explorer[];
    del: (name?: string | undefined) => void;
    add: (model: create) => void;
}
export declare class fileModel extends fileObject {
    constructor(root: explorer | create);
}
export declare class dirModel extends dirObject {
    constructor(root: explorer | create);
}
export declare function getType(exp: explorer): fileObject | dirObject;
export declare function getTypeModel(exp: create): fileModel | dirModel;
//# sourceMappingURL=tools.d.ts.map