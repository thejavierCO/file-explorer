import create from "../tools/create/index";
import explorer from "../tools/explorer/index";
import { fileObject, dirObject, otherObject } from "../tools/tools";
export declare type fileSystem = Array<fileObject | dirObject | otherObject>;
export declare type contentFile = string | Array<string> | Function;
export declare type contentDir = Array<explorer> | fileSystem | Function;
export declare type file = {
    name: string;
    root: string;
    type: string;
    extencion: string;
    content: contentFile;
    set: (name: string | Function) => create;
    get: (name?: string) => create;
    del: (name: string) => msg;
    add: (model: object) => create;
    read: (options?: {
        encoding: "ascii" | "utf8" | "utf-8" | "utf16le" | "ucs2" | "ucs-2" | "base64" | "latin1" | "binary" | "hex" | undefined;
    }) => contentFile;
};
export declare type dir = {
    name: string;
    root: string;
    type: string;
    content: contentDir;
    set: (name: string) => explorer | undefined;
    get: (name: string) => explorer;
    del: (name: string) => msg;
    add: (model: object) => create;
    read: (namedir: string) => contentDir;
};
export declare type other = {
    name: string;
    root: string;
    type: string;
};
export declare type msg = {
    root: string;
    status: boolean;
    message: string;
};
export declare type root = string;
export interface Icreate {
    type: string;
    file?: fileObject;
    dir?: dirObject;
}
export interface Iexplorer {
    type: string;
    file?: fileObject;
    dir?: dirObject;
    set: (name?: string) => explorer;
    get: (name?: string) => explorer;
    del: (name: string) => msg;
    add: (model: object) => create;
    read: (namedir: string) => contentDir;
    getName: () => string;
    getType: () => file | dir;
}
export interface Imain {
    root: string;
    create: () => create;
    explorer: () => explorer;
}
//# sourceMappingURL=elements.d.ts.map