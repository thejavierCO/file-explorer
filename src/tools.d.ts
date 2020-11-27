import { create } from "./create";
import { explorer } from "./explorer";
export declare type root = Array<string>;
export declare type model = fileModel | dirModel;
export declare type fileContent = Array<string>;
export declare type dirContent = Array<explorer> | Array<create>;
export declare function getRoot(...name: root): string;
export declare function existPath(root: string): boolean;
export declare function lastItem(element: root): any | string | undefined;
export declare function is(element: string): "file" | "dir" | "other";
export interface file {
}
export interface dir {
}
export declare class fileObject implements file {
}
export declare class dirObject implements dir {
}
export declare class fileModel extends fileObject {
    constructor(root: explorer | create);
}
export declare class dirModel extends dirObject {
}
export declare function getType(exp: explorer): fileObject | dirObject;
export declare function getTypeModel(exp: create): fileModel | dirModel;
//# sourceMappingURL=tools.d.ts.map