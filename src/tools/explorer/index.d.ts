import { Iexplorer } from "../../Types/elements";
declare class explorer implements Iexplorer {
    [x: string]: any;
    type: string;
    constructor(root: string);
    set: (name?: string | undefined) => any;
    get: (name?: string | undefined) => any;
    del: (name: string) => any;
    add: (...model: Array<object>) => any;
    read: (input: string | object) => any;
    getName: () => any;
    getType: () => any;
}
export default explorer;
//# sourceMappingURL=index.d.ts.map