"use strict";
exports.__esModule = true;
function is(element, fs) {
    if (fs === void 0) { fs = true; }
    if (typeof element === "object" && element.length > 0) {
        return "array";
    }
    else if (typeof element === "string") {
        if (typeof fs === "boolean" && fs) {
            if (/([.][\w\d]{0,})/i.test(element)) {
                return "file";
            }
            else {
                return "dir";
            }
        }
        else {
            return "string";
        }
    }
    else {
        return typeof element;
    }
}
exports["default"] = is;
