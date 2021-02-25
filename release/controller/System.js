"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Validate_1 = __importDefault(require("./Validate"));
/**
 * This is our class of our Login System
 */
var System = /** @class */ (function () {
    function System() {
        this.users = [];
        this.activeUsers = [];
        this.validate = new Validate_1.default();
    }
    System.prototype.getUsers = function () {
        var _this = this;
        return new Promise(function (fulfill, reject) {
            fulfill({
                code: 200,
                message: "a list of all regestered users",
                data: _this.users
            });
        });
    };
    System.prototype.getActiveUsers = function () {
        var _this = this;
        return new Promise(function (fulfill, reject) {
            fulfill({
                code: 200,
                message: "a list of all active users",
                data: _this.activeUsers
            });
        });
    };
    System.prototype.login = function (username, password) {
        var _this = this;
        return new Promise(function (fulfill, reject) {
            var isActive = (_this.activeUsers.filter(function (user) { return user.secret.username == username; })).length == 1;
            if (isActive) {
                reject({
                    code: 400,
                    message: "the user is already logged in"
                });
            }
            var notExist = (_this.users.filter(function (user) { return user.secret.username == username; })).length == 0;
            if (notExist) {
                reject({
                    code: 400,
                    message: "the given username is incorrect"
                });
            }
            var user = (_this.users.filter(function (user) { return user.secret.username == username; }))[0];
            if (user.secret.password == password) {
                _this.activeUsers.push(user);
                fulfill({
                    code: 200,
                    message: "logged in successfully"
                });
            }
            else {
                reject({
                    code: 400,
                    message: "the given password is incorrect"
                });
            }
        });
    };
    System.prototype.logout = function (username) {
        var _this = this;
        return new Promise(function (fulfill, reject) {
            var notActive = (_this.activeUsers.filter(function (user) { return user.secret.username == username; })).length == 0;
            if (notActive) {
                reject({
                    code: 400,
                    message: "the given username is not active"
                });
            }
            else {
                for (var i = 0; i < _this.activeUsers.length; i++) {
                    if (_this.activeUsers[i].secret.username == username) {
                        _this.activeUsers.splice(i, 1);
                        fulfill({
                            code: 200,
                            message: "logged out successfully"
                        });
                        break;
                    }
                }
            }
        });
    };
    System.prototype.addUser = function (user) {
        var _this = this;
        return new Promise(function (fulfill, reject) { return __awaiter(_this, void 0, void 0, function () {
            var username_1, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.validate.user(user)];
                    case 1:
                        _a.sent();
                        username_1 = user.secret.username;
                        if (this.users.filter(function (user) { return user.secret.username == username_1; }).length == 0) {
                            // [TODO] database
                            this.users.push(user);
                            fulfill({
                                code: 200,
                                message: "registered successfully"
                            });
                        }
                        else {
                            reject({
                                code: 400,
                                message: "the given username has already exist"
                            });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        reject(err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    System.prototype.modifyUser = function (username, user) {
        var _this = this;
        return new Promise(function (fulfill, reject) { return __awaiter(_this, void 0, void 0, function () {
            var wrappedOld, err_2, wrappedUser, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wrappedOld = this.users.filter(function (user) { return user.secret.username == username; });
                        // check whether the user to be updated exists
                        if (wrappedOld.length != 1) {
                            reject({
                                code: 400,
                                message: "the given username is not exist"
                            });
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.validate.user(user)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        reject(err_2);
                        return [3 /*break*/, 4];
                    case 4:
                        wrappedUser = this.users.filter(function (_user) { return _user.secret.username == user.secret.username; });
                        if (wrappedUser.length == 1) {
                            if (wrappedOld[0].secret.username != user.secret.username) {
                                reject({
                                    code: 400,
                                    message: "the given username is already exists"
                                });
                            }
                        }
                        // Update user
                        // [TODO] database
                        for (i = 0; i < this.users.length; i++) {
                            if (this.users[i].secret.username == username) {
                                this.users[i] = {
                                    first_name: user.first_name,
                                    last_name: user.last_name,
                                    date_of_birth: user.date_of_birth,
                                    gender: user.gender,
                                    secret: {
                                        username: user.secret.username,
                                        password: user.secret.password,
                                        email: user.secret.email
                                    }
                                };
                                fulfill({
                                    code: 200,
                                    message: "update successfully"
                                });
                                break;
                            }
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    System.prototype.deleteUser = function (username) {
        var _this = this;
        return new Promise(function (fulfill, reject) {
            var wrappedUser = _this.users.filter(function (user) { return user.secret.username == username; });
            // check whether the user to be deleted exists
            if (wrappedUser.length != 1) {
                reject({
                    code: 400,
                    message: "the given username is not exist"
                });
            }
            // [TODO] database
            for (var i = 0; i < _this.users.length; i++) {
                if (_this.users[i].secret.username == username) {
                    _this.users.splice(i, 1);
                    fulfill({
                        code: 200,
                        message: "update successfully"
                    });
                    break;
                }
            }
        });
    };
    return System;
}());
exports.default = System;
