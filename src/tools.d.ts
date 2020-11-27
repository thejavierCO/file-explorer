import { create } from "./create";
import { explorer } from "./explorer";
export declare type root = string;
export declare function getRoot(...root: Array<string>): string;
export declare function existRoot(...root: Array<string>): boolean;
export declare function getTypeElement(element: root): "file" | "dir";
export declare function lastItem(element: Array<any | undefined | null>): any;
export declare function toRoot(element: root | Array<root>): string;
export declare function rootSplit(element: root | Array<root>): Array<string>;
export declare type fileContent = Array<string>;
export declare type file = {
    root: root;
    name: string;
    type: "file";
    extension: string | undefined;
    content: fileContent;
};
export declare type dirContent = Array<explorer | create>;
export declare type dir = {
    root: root;
    name: string;
    type: "dir";
    content: dirContent;
};
export declare class fileFactory implements file {
    _root: string;
    _name: string;
    type: "file";
    extension: string | undefined;
    protected _content: fileContent;
    constructor(root?: string);
    protected getExtension(): string | undefined;
    protected read(): fileContent;
    protected writeLast(data: fileContent): fileContent;
    protected rename(newName: string): string;
    protected write(data: fileContent): fileContent;
    get content(): fileContent;
    set content(data: fileContent);
    get root(): string;
    set root(a: string);
    get name(): string;
    set name(a: string);
}
export declare class dirFactory implements dir {
    _root: string;
    _name: string;
    type: "dir";
    _content: dirContent;
    constructor(root: string);
    protected read(): dirContent;
    protected add(data: dirContent): dirContent;
    protected rename(newName: string): string;
    protected del(name: string): void;
    protected get(name: string): void;
    protected set(name: string): void;
    protected existElement(name: string): boolean;
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
export declare class fileObject extends fileFactory implements model {
    isExist: boolean;
    constructor(root: string);
    protected read(): string[];
    writeLast(data: fileContent | string): string[];
    protected rename(newName: string): string;
    protected write(data: fileContent): string[];
}
export declare class dirObject extends dirFactory implements model {
    isExist: boolean;
    constructor(root: string);
    protected read(): explorer[];
    protected del(name: string): void;
    protected get(name: string): void;
    protected set(name: string): void;
    protected add(data: dirContent): dirContent;
    protected rename(newName: string): string;
}
//# sourceMappingURL=tools.d.ts.map