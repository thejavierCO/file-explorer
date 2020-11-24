import { root, file, dir, other } from "../Types/elements";
import explorer from "./explorer";
export declare function getLast(array: Array<root>): string;
export declare function is(name: string): "dir" | "file" | "other";
export declare class fileObject implements file {
    root: string;
    name: string;
    type: string;
    extencion: string;
    content: string;
    constructor(root: string);
    set: (name: string | Function) => void;
    get: (name?: string | undefined) => void;
    del: (name?: string | undefined) => void;
    add: (model: object) => void;
    read: () => string;
}
export declare class dirObject implements dir {
    root: string;
    name: string;
    type: string;
    content: never[];
    constructor(root: string);
    set: (name: string | Function) => explorer | undefined;
    get: (name: string) => explorer;
    del: (name?: string | undefined) => {
        root: string;
        status: boolean;
        message: string;
    };
    add: (model: object) => void;
    read: (name?: string | undefined) => explorer[];
}
export declare class otherObject implements other {
    root: string;
    name: string;
    type: string;
    constructor(root: string);
}
export declare function getObjectType(root: string): fileObject | dirObject | otherObject;
//# sourceMappingURL=tools.d.ts.map