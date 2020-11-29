import { create } from "./create";
import { explorer } from "./explorer";
export declare type root = string | undefined;
export declare type type = "dir" | "file" | undefined;
export declare type name = string;
export declare type fileContent = Array<string | String>;
export declare type dirContent = Array<explorer | create>;
export declare type file = {
    root: root;
    name: name | root;
    type: "file";
    extension: string | undefined;
    content: fileContent;
};
export declare type dir = {
    root: root;
    name: name | root;
    type: "dir";
    content: dirContent;
};
declare type fragmanetMethodsResult = {
    result: Array<string>;
    last: string;
    first: string;
    filter: (posicion: any, i: number, this_array: Array<any>) => Array<any>;
    remplaceLast: (name: string) => string;
};
export declare function getTypeElement(element: root): "file" | "dir";
export declare function lastItem(element: Array<any | undefined | null>): any;
export declare function getRoot(...root: Array<string | undefined>): string;
export declare function existRoot(...root: Array<string>): boolean;
export declare function toRoot(element: root | Array<root>): string;
export declare function isRoot(element: root | Array<root>): boolean;
export declare function fragmanetRoot(element: root | Array<root>): fragmanetMethodsResult;
export declare function ObjectType(type: type, root: root): fileObject | dirObject | undefined;
export declare class fileModel implements file {
    protected _root: string;
    protected _name: string | undefined;
    protected _content: fileContent;
    protected _extencion: string | undefined;
    type: "file";
    constructor(root: root);
    protected getExtension(name?: string): string | undefined;
    protected getName(root?: root): {
        name: string;
        extension: string;
    };
    protected read(): fileContent;
    protected rename(newName: string): string;
    protected write(data: fileContent | string): fileContent;
    protected newRoot(root: root): root;
    writeLast(...data: fileContent): fileContent;
    get extension(): root;
    set extension(a: root);
    get content(): fileContent;
    set content(data: fileContent);
    get root(): string;
    set root(a: string);
    get name(): string;
    set name(a: string);
}
export declare class dirModel implements dir {
    _root: string;
    _name: string;
    type: "dir";
    _content: dirContent;
    constructor(root: root);
    protected read(): dirContent;
    protected add(data: dirContent): dirContent;
    protected rename(newName: string): string;
    get content(): dirContent;
    set content(data: dirContent);
    get root(): string;
    set root(a: string);
    get name(): string;
    set name(a: string);
}
export declare type model = {
    isExist: boolean;
};
export declare class fileObject extends fileModel implements model {
    isExist: boolean;
    constructor(root: string);
}
export declare class dirObject extends dirModel implements model {
    isExist: boolean;
    constructor(root: string);
}
export {};
//# sourceMappingURL=tools.d.ts.map