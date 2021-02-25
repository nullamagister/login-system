"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var server_1 = __importDefault(require("../server"));
var router = express_1.default.Router();
var system;
setImmediate(function () { return system = server_1.default.getSystem(); });
// TODO
exports.default = router;
