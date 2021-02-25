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
var ISystem_1 = require("../controller/ISystem");
var System_1 = __importDefault(require("../controller/System"));
describe("Login User", function () {
    var system;
    var user;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    system = new System_1.default();
                    user = {
                        first_name: "myNameIs",
                        last_name: "myNameIs",
                        date_of_birth: "May 23, 1992",
                        gender: ISystem_1.Gender.Male,
                        secret: {
                            username: "myValidUser1",
                            password: "myPasswoArd",
                            email: "myEmail@website.com"
                        }
                    };
                    return [4 /*yield*/, system.addUser(user)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, system.disconnectDatabase()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Valid Login", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, system.login(user.secret.username, user.secret.password)];
                case 1:
                    result = _a.sent();
                    expect(result.code).toBe(200);
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    fail();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    it("Invalid Login: username", function () { return __awaiter(void 0, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, system.login("NotFoundUsnm", user.secret.password)];
                case 1:
                    _a.sent();
                    fail();
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    expect(err_2.code).toBe(400);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    it("Invalid Login: password", function () { return __awaiter(void 0, void 0, void 0, function () {
        var err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, system.login(user.secret.username, "NotFoundPass")];
                case 1:
                    _a.sent();
                    fail();
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    expect(err_3.code).toBe(400);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    it("Invalid Login: already logged in", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, system.login(user.secret.username, user.secret.password)];
                case 1:
                    result = _a.sent();
                    expect(result.code).toBe(200);
                    return [4 /*yield*/, system.login(user.secret.username, user.secret.password)];
                case 2:
                    _a.sent();
                    fail();
                    return [3 /*break*/, 4];
                case 3:
                    err_4 = _a.sent();
                    expect(err_4.code).toBe(400);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
});
describe("Logout User", function () {
    var system;
    var user;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    system = new System_1.default();
                    user = {
                        first_name: "myNameIs",
                        last_name: "myNameIs",
                        date_of_birth: "May 23, 1992",
                        gender: ISystem_1.Gender.Male,
                        secret: {
                            username: "myValidUser1",
                            password: "myPasswoArd",
                            email: "myEmail@website.com"
                        }
                    };
                    return [4 /*yield*/, system.addUser(user)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, system.login(user.secret.username, user.secret.password)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, system.disconnectDatabase()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Valid Logout", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, system.logout(user.secret.username)];
                case 1:
                    result = _a.sent();
                    expect(result.code).toBe(200);
                    return [3 /*break*/, 3];
                case 2:
                    err_5 = _a.sent();
                    console.log(err_5);
                    fail();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    it("Invalid Logout: usrname", function () { return __awaiter(void 0, void 0, void 0, function () {
        var err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, system.logout("NotFound")];
                case 1:
                    _a.sent();
                    fail();
                    return [3 /*break*/, 3];
                case 2:
                    err_6 = _a.sent();
                    expect(err_6.code).toBe(400);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
});
describe("Add User", function () {
    var system;
    var validUser;
    var invalidUser;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            system = new System_1.default();
            validUser = {
                first_name: "myNameIs",
                last_name: "myNameIs",
                date_of_birth: "May 23, 1992",
                gender: ISystem_1.Gender.Male,
                secret: {
                    username: "myValidUser1",
                    password: "myPasswoArd",
                    email: "myEmail@website.com"
                }
            };
            invalidUser = {
                first_name: "myNameIs",
                last_name: "myNameIs",
                date_of_birth: "Junuary 33, 1992",
                gender: ISystem_1.Gender.Male,
                secret: {
                    username: "myInValidUser1",
                    password: "myPassworWd",
                    email: "myEmail@website.com"
                }
            };
            return [2 /*return*/];
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, system.disconnectDatabase()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Valid Addition", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, err_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, system.addUser(validUser)];
                case 1:
                    result = _a.sent();
                    expect(result.code).toBe(200);
                    return [3 /*break*/, 3];
                case 2:
                    err_7 = _a.sent();
                    fail();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    it("Invalid Addition: Validation", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, err_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, system.addUser(invalidUser)];
                case 1:
                    result = _a.sent();
                    fail();
                    return [3 /*break*/, 3];
                case 2:
                    err_8 = _a.sent();
                    expect(err_8.code).toBe(402);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    it("Invalid Addition: already-exists", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, err_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, system.addUser(validUser)];
                case 1:
                    result = _a.sent();
                    fail();
                    return [3 /*break*/, 3];
                case 2:
                    err_9 = _a.sent();
                    expect(err_9.code).toBe(400);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
});
describe("Modify User", function () {
    var system;
    var validUser1;
    var validUser2;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    system = new System_1.default();
                    validUser1 = {
                        first_name: "myNameIs",
                        last_name: "myNameIs",
                        date_of_birth: "May 23, 1992",
                        gender: ISystem_1.Gender.Male,
                        secret: {
                            username: "myValidUser1",
                            password: "myPassword",
                            email: "myEmail@website.com"
                        }
                    };
                    validUser2 = {
                        first_name: "myNameIs",
                        last_name: "myNameIs",
                        date_of_birth: "January 28, 1992",
                        gender: ISystem_1.Gender.Male,
                        secret: {
                            username: "myValidUser2",
                            password: "myPassword",
                            email: "myEmail@website.com"
                        }
                    };
                    return [4 /*yield*/, system.addUser(validUser1)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, system.addUser(validUser2)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, system.disconnectDatabase()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Valid Modification: with new username", function () { return __awaiter(void 0, void 0, void 0, function () {
        var username, result, err_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = validUser1.secret.username;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, system.replaceUser(username, {
                            first_name: "modifiedName",
                            last_name: "ModifiedName",
                            date_of_birth: "April 7, 2000",
                            gender: ISystem_1.Gender.Female,
                            secret: {
                                username: "ModifiedUN",
                                password: "ModifiedPass",
                                email: "Modified@website.com"
                            }
                        })];
                case 2:
                    result = _a.sent();
                    expect(result.code).toBe(200);
                    return [3 /*break*/, 4];
                case 3:
                    err_10 = _a.sent();
                    fail();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("Valid Modification: without new username", function () { return __awaiter(void 0, void 0, void 0, function () {
        var username, result, err_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = validUser1.secret.username;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, system.replaceUser(username, {
                            first_name: "modifiedName",
                            last_name: "ModifiedName",
                            date_of_birth: "April 7, 2000",
                            gender: ISystem_1.Gender.Female,
                            secret: {
                                username: validUser1.secret.username,
                                password: "ModifiedPass",
                                email: "Modified@website.com"
                            }
                        })];
                case 2:
                    result = _a.sent();
                    expect(result.code).toBe(200);
                    return [3 /*break*/, 4];
                case 3:
                    err_11 = _a.sent();
                    fail();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("Invalid Modification: Validation", function () { return __awaiter(void 0, void 0, void 0, function () {
        var username, err_12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = validUser1.secret.username;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, system.replaceUser(username, {
                            first_name: "modifiedName",
                            last_name: "ModifiedName",
                            date_of_birth: "April 7, 2000",
                            gender: ISystem_1.Gender.Female,
                            secret: {
                                username: "ModifiedUN",
                                password: "notvalidpass",
                                email: "Modified@website.com"
                            }
                        })];
                case 2:
                    _a.sent();
                    fail();
                    return [3 /*break*/, 4];
                case 3:
                    err_12 = _a.sent();
                    //console.log(err);
                    expect(err_12.code).toBe(402);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("Invalid Modification: new username exists", function () { return __awaiter(void 0, void 0, void 0, function () {
        var username, err_13;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = validUser1.secret.username;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, system.replaceUser(username, {
                            first_name: "modifiedName",
                            last_name: "ModifiedName",
                            date_of_birth: "April 7, 2000",
                            gender: ISystem_1.Gender.Female,
                            secret: {
                                username: "myValidUser2",
                                password: "abCabcABCASDWD",
                                email: "Modified@website.com"
                            }
                        })];
                case 2:
                    _a.sent();
                    fail();
                    return [3 /*break*/, 4];
                case 3:
                    err_13 = _a.sent();
                    expect(err_13.code).toBe(400);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("Invalid Modification: username not-exist", function () { return __awaiter(void 0, void 0, void 0, function () {
        var username, result, err_14;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = "NotExistUN";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, system.replaceUser(username, {
                            first_name: "modifiedName",
                            last_name: "ModifiedName",
                            date_of_birth: "April 7, 2000",
                            gender: ISystem_1.Gender.Female,
                            secret: {
                                username: "ModifiedUN",
                                password: "ModifiedPass",
                                email: "Modified@website.com"
                            }
                        })];
                case 2:
                    result = _a.sent();
                    fail();
                    return [3 /*break*/, 4];
                case 3:
                    err_14 = _a.sent();
                    expect(err_14.code).toBe(400);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
});
describe("Delete User", function () {
    var system;
    var user;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    system = new System_1.default();
                    user = {
                        first_name: "myNameIs",
                        last_name: "myNameIs",
                        date_of_birth: "May 23, 1992",
                        gender: ISystem_1.Gender.Male,
                        secret: {
                            username: "myValidUser1",
                            password: "myPasswoArd",
                            email: "myEmail@website.com"
                        }
                    };
                    return [4 /*yield*/, system.addUser(user)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, system.disconnectDatabase()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Valid Deletion", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, err_15;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, system.removeUser(user.secret.username)];
                case 1:
                    result = _a.sent();
                    expect(result.code).toBe(200);
                    return [3 /*break*/, 3];
                case 2:
                    err_15 = _a.sent();
                    fail();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    it("Invalid Deletion: not-exist", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, err_16;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, system.removeUser("NotExist")];
                case 1:
                    result = _a.sent();
                    fail();
                    return [3 /*break*/, 3];
                case 2:
                    err_16 = _a.sent();
                    expect(err_16.code).toBe(400);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
});
