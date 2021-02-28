"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var LodashAlgo = /** @class */ (function () {
    function LodashAlgo() {
    }
    LodashAlgo.prototype.user = function (user) {
        return lodash_1.cloneDeep(user);
    };
    LodashAlgo.prototype.users = function (users) {
        return lodash_1.cloneDeep(users);
    };
    return LodashAlgo;
}());
exports.default = LodashAlgo;
