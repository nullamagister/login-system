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
var mongoose_1 = __importDefault(require("mongoose"));
var User_1 = __importDefault(require("./User"));
var Mongodb = /** @class */ (function () {
    function Mongodb(url) {
        this.url = url;
    }
    Mongodb.prototype.connect = function () {
        var _this = this;
        return new Promise(function (fulfill, reject) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                mongoose_1.default.connect(this.url, { useNewUrlParser: true, useUnifiedTopology: true }).then(function () {
                    console.log("Databased opened successfully");
                    fulfill({
                        code: 204,
                        message: "Databased opened successfully"
                    });
                }, function () {
                    console.log("Error: unable to open database");
                    reject({
                        code: 404,
                        message: "Error: unable to open database"
                    });
                });
                return [2 /*return*/];
            });
        }); });
    };
    Mongodb.prototype.disconnect = function () {
        var _this = this;
        return new Promise(function (fulfill, reject) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                mongoose_1.default.disconnect().then(function () {
                    console.log("Databased closed successfully");
                    fulfill({
                        code: 204,
                        message: "Databased closed successfully"
                    });
                }, function () {
                    console.log("Error: unable to close database");
                    reject({
                        code: 404,
                        message: "Error: unable to close database"
                    });
                });
                return [2 /*return*/];
            });
        }); });
    };
    Mongodb.prototype.destroy = function () {
        return new Promise(function (fulfill, reject) {
            User_1.default.db.dropDatabase().then(function () {
                console.log("Databased destroyed successfully");
                fulfill({
                    code: 204,
                    message: "Databased destroyed successfully"
                });
            }, function (err) {
                console.log("Error: unable to destroy database");
                reject({
                    code: 404,
                    message: "Error: Failed to destroy database"
                });
            });
        });
    };
    Mongodb.prototype.getUsers = function () {
        return new Promise(function (fulfill, reject) {
            User_1.default.find(function (err, docs) {
                if (err) {
                    reject({
                        code: 404,
                        message: "Error: unable to retrieve all users from database"
                    });
                }
                fulfill({
                    code: 204,
                    message: "Getting all users from database successfully",
                    data: docs
                });
            });
        });
    };
    Mongodb.prototype.addUser = function (user) {
        return new Promise(function (fulfill, reject) {
            var newUser = new User_1.default(user);
            newUser.save().then(function (docs) {
                fulfill({
                    code: 204,
                    message: "The given user added to the database successfully"
                });
            }, function (err) {
                reject({
                    code: 404,
                    message: "Error: unable to add the given user to the database"
                });
            });
        });
    };
    Mongodb.prototype.replaceUser = function (username, user) {
        return new Promise(function (fulfill, reject) {
            var newUser = new User_1.default(user);
            var newUserObjWithoutId = newUser.toObject();
            delete newUserObjWithoutId._id;
            delete newUserObjWithoutId.secret._id;
            User_1.default.replaceOne({ 'secret.username': username }, newUserObjWithoutId).then(function (res) {
                if (res.nModified == 0) {
                    reject({
                        code: 404,
                        message: "Error: unable to replace the given user"
                    });
                }
                fulfill({
                    code: 204,
                    message: "The given username user replaced successfully"
                });
            }, function (err) {
                reject({
                    code: 404,
                    message: "Error: unable to replace the given user"
                });
            });
        });
    };
    Mongodb.prototype.removeUser = function (username) {
        return new Promise(function (fulfill, reject) {
            User_1.default.deleteOne({ 'secret.username': username }).then(function (res) {
                if (res.deletedCount == 0) {
                    reject({
                        code: 404,
                        message: "Error: unable to remove the given user"
                    });
                }
                fulfill({
                    code: 204,
                    message: "The given username user removed successfully"
                });
            }, function () {
                reject({
                    code: 404,
                    message: "Error: unable to remove the given user"
                });
            });
        });
    };
    return Mongodb;
}());
exports.default = Mongodb;
