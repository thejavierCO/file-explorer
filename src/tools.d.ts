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
export declare type rootInstance = {};
export declare type model = {
    isExist: boolean;
};
export declare function getTypeElement(element: root): "file" | "dir";
export declare function lastItem(element: Array<any | undefined | null>): any;
export declare function ObjectType(type: type, root: root): fileObject | dirObject | undefined;
export declare class Root implements rootInstance {
    private _root;
    constructor(root: root);
    isRoot(element: root | Array<root>): boolean;
    getRoot: (...root: Array<string | undefined>) => string;
    existRoot: (...root: Array<string>) => boolean;
    setRoot: (element: root | Array<root>) => string;
    remplace: (posicion: number, element: string) => Root;
    get: (posicion: number) => string;
    get root(): string;
    get elements(): string[];
    get length(): number;
    get exist(): boolean;
}
export declare class fileModel extends Root implements file {
    constructor(root: root);
}
export declare class dirModel extends Root implements dir {
    _name: string;
    type: "dir";
    _content: dirContent;
    constructor(root: root);
}
export declare class fileObject extends fileModel implements model {
    isExist: boolean;
    constructor(root: string);
}
export declare class dirObject extends dirModel implements model {
    isExist: boolean;
    constructor(root: string);
}
//# sourceMappingURL=tools.d.ts.map