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
var Validate_1 = __importDefault(require("../view/Validate"));
describe("Valid Users", function () {
    var validator;
    beforeEach(function () {
        validator = new Validate_1.default();
    });
    it("Valid user: one", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = {
                        first_name: "oneoneone",
                        last_name: "oneoneone",
                        date_of_birth: "May 23, 1997",
                        gender: ISystem_1.Gender.Female,
                        secret: { username: "oneoneon",
                            password: "123456789Aa",
                            email: "one@email.com" }
                    };
                    return [4 /*yield*/, validator.user(user)];
                case 1:
                    result = _a.sent();
                    expect(result.code).toBe(202);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Valid user: two", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = {
                        first_name: "twotwotwo",
                        last_name: "twotwotwo",
                        date_of_birth: "April 17, 1998",
                        gender: ISystem_1.Gender.Male,
                        secret: { username: "twotwotw",
                            password: "123456789sS",
                            email: "two@email.com" }
                    };
                    return [4 /*yield*/, validator.user(user)];
                case 1:
                    result = _a.sent();
                    expect(result.code).toBe(202);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("Invalid Users", function () {
    var validator;
    beforeEach(function () {
        validator = new Validate_1.default();
    });
    it("Invalid name: min-length", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = {
                        first_name: "ab",
                        last_name: "one",
                        date_of_birth: "May 23, 1997",
                        gender: ISystem_1.Gender.Female,
                        secret: { username: "abcabcabc",
                            password: "123456789Aa",
                            email: "one@email.com" }
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, validator.user(user)];
                case 2:
                    _a.sent();
                    fail();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    expect(err_1.code).toBe(402);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("Invalid name: max-length", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = {
                        first_name: "abcabcabcabcabcab",
                        last_name: "one",
                        date_of_birth: "May 23, 1997",
                        gender: ISystem_1.Gender.Female,
                        secret: { username: "one",
                            password: "123456789Aa",
                            email: "one@email.com" }
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, validator.user(user)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    expect(err_2.code).toBe(402);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("Invalid name: character", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = {
                        first_name: "abcabcabc",
                        last_name: "abc abc^abc",
                        date_of_birth: "May 23, 1997",
                        gender: ISystem_1.Gender.Female,
                        secret: { username: "one",
                            password: "123456789Aa",
                            email: "one@email.com" }
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, validator.user(user)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_3 = _a.sent();
                    expect(err_3.code).toBe(402);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("Invalid date: Month", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = {
                        first_name: "oneoneone",
                        last_name: "oneoneone",
                        date_of_birth: "Mays 23, 1997",
                        gender: ISystem_1.Gender.Female,
                        secret: { username: "oneoneone",
                            password: "123456789Aa",
                            email: "one@email.com" }
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, validator.user(user)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_4 = _a.sent();
                    expect(err_4.code).toBe(402);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("Invalid date: day", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = {
                        first_name: "oneoneone",
                        last_name: "oneoneone",
                        date_of_birth: "Mays 33, 1997",
                        gender: ISystem_1.Gender.Female,
                        secret: { username: "oneoneone",
                            password: "123456789Aa",
                            email: "one@email.com" }
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, validator.user(user)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_5 = _a.sent();
                    expect(err_5.code).toBe(402);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("Invalid date: minimun year", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = {
                        first_name: "oneoneone",
                        last_name: "oneoneone",
                        date_of_birth: "Mays 23, 1940",
                        gender: ISystem_1.Gender.Female,
                        secret: { username: "one",
                            password: "123456789Aa",
                            email: "one@email.com" }
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, validator.user(user)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_6 = _a.sent();
                    expect(err_6.code).toBe(402);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("Invalid date: maximum year", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, err_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = {
                        first_name: "oneoneone",
                        last_name: "oneoneone",
                        date_of_birth: "Mays 23, 2010",
                        gender: ISystem_1.Gender.Female,
                        secret: { username: "abcabcabc",
                            password: "123456789Aa",
                            email: "one@email.com" }
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, validator.user(user)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_7 = _a.sent();
                    expect(err_7.code).toBe(402);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("Invalid date: character", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, err_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = {
                        first_name: "oneoneone",
                        last_name: "oneoneone",
                        date_of_birth: "Mays 23, five",
                        gender: ISystem_1.Gender.Female,
                        secret: { username: "abcabcabc",
                            password: "123456789Aa",
                            email: "one@email.com" }
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, validator.user(user)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_8 = _a.sent();
                    expect(err_8.code).toBe(402);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("Invalid username: min-length", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, err_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = {
                        first_name: "oneoneone",
                        last_name: "oneoneone",
                        date_of_birth: "April 17, 1998",
                        gender: ISystem_1.Gender.Male,
                        secret: { username: "abc",
                            password: "123456789sS",
                            email: "two@email.com" }
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, validator.user(user)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_9 = _a.sent();
                    expect(err_9.code).toBe(402);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("Invalid username: max-length", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, err_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = {
                        first_name: "oneoneone",
                        last_name: "oneoneone",
                        date_of_birth: "April 17, 1998",
                        gender: ISystem_1.Gender.Male,
                        secret: { username: "abcabcabcabcabcab",
                            password: "1234567890sS",
                            email: "two@email.com" }
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, validator.user(user)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_10 = _a.sent();
                    expect(err_10.code).toBe(402);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("Invalid username: character", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, err_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = {
                        first_name: "oneoneone",
                        last_name: "oneoneone",
                        date_of_birth: "April 17, 1998",
                        gender: ISystem_1.Gender.Male,
                        secret: { username: "one one#one$",
                            password: "123456789sS",
                            email: "two@email.com" }
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, validator.user(user)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_11 = _a.sent();
                    expect(err_11.code).toBe(402);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("Invalid password: character", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, err_12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = {
                        first_name: "oneoneone",
                        last_name: "oneoneone",
                        date_of_birth: "April 17, 1998",
                        gender: ISystem_1.Gender.Male,
                        secret: { username: "oneoneone",
                            password: "123456789ss",
                            email: "two@email.com" }
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, validator.user(user)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_12 = _a.sent();
                    expect(err_12.code).toBe(402);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("Invalid password: min-length", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, err_13;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = {
                        first_name: "oneoneone",
                        last_name: "oneoneone",
                        date_of_birth: "April 17, 1998",
                        gender: ISystem_1.Gender.Male,
                        secret: { username: "oneoneone",
                            password: "123456sS",
                            email: "two@email.com" }
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, validator.user(user)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_13 = _a.sent();
                    expect(err_13.code).toBe(402);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("Invalid password: max-length", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, err_14;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = {
                        first_name: "oneoneone",
                        last_name: "oneoneone",
                        date_of_birth: "April 17, 1998",
                        gender: ISystem_1.Gender.Male,
                        secret: { username: "oneoneone",
                            password: "123456789123456789sSX",
                            email: "two@email.com" }
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, validator.user(user)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_14 = _a.sent();
                    expect(err_14.code).toBe(402);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("Invalid email: identifier", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, err_15;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = {
                        first_name: "oneoneone",
                        last_name: "oneoneone",
                        date_of_birth: "April 17, 1998",
                        gender: ISystem_1.Gender.Male,
                        secret: { username: "oneoneone",
                            password: "1234567896789sS",
                            email: "@email.com" }
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, validator.user(user)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_15 = _a.sent();
                    expect(err_15.code).toBe(402);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("Invalid email: @", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, err_16;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = {
                        first_name: "oneoneone",
                        last_name: "oneoneone",
                        date_of_birth: "April 17, 1998",
                        gender: ISystem_1.Gender.Male,
                        secret: { username: "oneoneone",
                            password: "1234567896789sS",
                            email: "twoemail.com" }
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, validator.user(user)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_16 = _a.sent();
                    expect(err_16.code).toBe(402);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("Invalid email: website", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, err_17;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = {
                        first_name: "oneoneone",
                        last_name: "oneoneone",
                        date_of_birth: "April 17, 1998",
                        gender: ISystem_1.Gender.Male,
                        secret: { username: "oneoneone",
                            password: "1234567896789sS",
                            email: "two@.com" }
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, validator.user(user)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_17 = _a.sent();
                    expect(err_17.code).toBe(402);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("Invalid email: .com", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, err_18;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = {
                        first_name: "oneoneone",
                        last_name: "oneoneone",
                        date_of_birth: "April 17, 1998",
                        gender: ISystem_1.Gender.Male,
                        secret: { username: "oneoneone",
                            password: "1234567896789sS",
                            email: "twoe@two" }
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, validator.user(user)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_18 = _a.sent();
                    expect(err_18.code).toBe(402);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
});
