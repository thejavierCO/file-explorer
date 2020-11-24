"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tools_1 = require("../tools");
var path = __importStar(require("path"));
var fs_1 = __importDefault(require("fs"));
var explorer = /** @class */ (function () {
    function explorer(root) {
        var _this = this;
        this.type = "other";
        this.set = function (name) {
            var type = _this.getType();
            return type.set(name);
        };
        this.get = function (name) {
            var type = _this.getType();
            return type.get(name);
        };
        this.del = function (name) {
            var type = _this.getType();
            return type.del(name);
        };
        this.add = function () {
            var model = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                model[_i] = arguments[_i];
            }
            var type = _this.getType();
            return type.add(model);
        };
        this.read = function (input) {
            var type = _this.getType();
            return type.read(input ? input : "");
        };
        this.getName = function () {
            var type = _this.getType();
            return type.name || "";
        };
        this.getType = function () {
            if (_this.type === "dir") {
                return _this.dir;
            }
            else if (_this.type === "file") {
                return _this.file;
            }
            else {
                console.log("\n" + "--".repeat(10), _this, "--".repeat(10) + "\n");
                throw new Error("not defined type");
            }
        };
        if (fs_1.default.existsSync(path.resolve(root))) {
            var name_1 = tools_1.getLast(root.split("\\"));
            this.type = tools_1.is(name_1);
            root = path.resolve(root);
            this[tools_1.is(name_1)] = tools_1.getObjectType(root);
        }
        else {
            throw new Error([
                "not access in",
                "Root: " + root,
                "",
                ""
            ].join("\n"));
        }
    }
    return explorer;
}());
exports.default = explorer;
