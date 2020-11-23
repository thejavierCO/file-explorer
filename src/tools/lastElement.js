"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var is_1 = __importDefault(require("./is"));
function lastElement(element) {
    if (is_1.default(element) === "array") {
        return element[element.length - 1];
    }
    else {
        throw { error: "require array" };
    }
}
exports.default = lastElement;
