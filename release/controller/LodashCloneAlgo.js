"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var LodashCloneAlgo = /** @class */ (function () {
    function LodashCloneAlgo() {
    }
    LodashCloneAlgo.prototype.user = function (user) {
        return lodash_1.cloneDeep(user);
    };
    LodashCloneAlgo.prototype.users = function (users) {
        return lodash_1.cloneDeep(users);
    };
    return LodashCloneAlgo;
}());
exports.default = LodashCloneAlgo;
