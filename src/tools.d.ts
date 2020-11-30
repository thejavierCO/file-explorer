import { explorer } from "./explorer";
export declare type root = string | undefined;
export declare type type = "dir" | "file" | undefined;
export declare type name = string;
export declare type fileContent = Array<string | String>;
export declare type dirContent = Array<explorer>;
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
export declare type model = {};
export declare function getTypeElement(element: root): "file" | "dir";
export declare function ObjectType(type: type, root: root): fileObject | dirObject | undefined;
export declare class Root implements rootInstance {
    private _root;
    constructor(root?: root);
    isRoot(element: root | Array<root>): boolean;
    getRoot(...root: Array<string | undefined>): string;
    existRoot(...root: Array<root>): boolean;
    setRoot(element: root | Array<root>): string;
    toRoot(element: root | Array<root>): string;
    remplace(posicion: number, element: string): Root;
    get(posicion: number): string | undefined;
    push(name: string): root;
    pop(posicion: number): root;
    shift(): root;
    concat(elements: string): string;
    filter(condicion: (posicion?: string, index?: number, array?: object) => boolean): string;
    map(condicion: (posicion?: string, index?: number, array?: object) => any): string;
    includes(element: string, fromIndex?: number | undefined): boolean;
    slice(start: number, end: number): string[];
    get root(): root;
    set root(root: root);
    get elements(): string[];
    get length(): number;
    get exist(): boolean;
}
export declare class fileModel extends Root implements file {
    protected _name: string | undefined;
    protected _content: fileContent;
    protected _extencion: string | undefined;
    type: "file";
    constructor(root: root);
    protected getName(root?: root): {
        name: string;
        extension: string;
    };
    protected read(): fileContent;
    protected rename(newName: string): string;
    protected write(data: fileContent | string): fileContent;
    writeLast(...data: fileContent): fileContent;
    get extension(): root;
    set extension(a: root);
    get content(): fileContent;
    set content(data: fileContent);
    get name(): string;
    set name(a: string);
}
export declare class dirModel extends Root implements dir {
    _name: string;
    type: "dir";
    _content: dirContent;
    constructor(root: root);
    protected getName(root?: root): string;
    protected read(): dirContent;
    protected add(data: dirContent): dirContent;
    protected rename(newName: string): string;
    protected write(data: dirContent): dirContent;
    get content(): dirContent;
    set content(data: dirContent);
    get name(): string;
    set name(a: string);
}
export declare class fileObject extends fileModel implements model {
    constructor(root: string);
    protected read(): fileContent;
    writeLast(data: fileContent | string): string[];
    protected rename(newName: string): string;
    protected write(data: fileContent): fileContent;
}
export declare class dirObject extends dirModel implements model {
    constructor(root: string);
    protected read(): dirContent;
}
//# sourceMappingURL=tools.d.ts.map