import { create } from "./create";
import { explorer } from "./explorer";
export declare function getRoot(...name: Array<string>): void;
export declare function existPath(root?: string): void;
export declare function lastItem(element: Array<string>): void;
export declare function is(element: string): void;
export interface file {
}
export interface dir {
}
export declare class fileObject implements file {
}
export declare class dirObject implements dir {
}
export declare class fileModel extends fileObject {
}
export declare class dirModel extends dirObject {
}
export declare function getType(exp: explorer): void;
export declare function getTypeModel(exp: create): void;
//# sourceMappingURL=tools.d.ts.map