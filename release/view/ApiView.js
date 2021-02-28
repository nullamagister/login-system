"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var System_1 = __importDefault(require("../controller/System"));
var Validate_1 = __importDefault(require("./Validate"));
var ApiView = /** @class */ (function () {
    function ApiView(db) {
        this.system = System_1.default.getSystem(db);
        this.validate = new Validate_1.default();
    }
    ApiView.prototype.register = function (user) {
        var _this = this;
        return new Promise(function (fulfill, reject) {
            var numericDate = user.date_of_birth;
            var textualDate = _this.textualizeDate(numericDate);
            user.date_of_birth = textualDate;
            _this.validate.user(user)
                .then(function () { return _this.system.addUser(user); })
                .then(function (res) { return fulfill(res); })
                .catch(function (err) { return reject(err); });
        });
    };
    ApiView.prototype.login = function (username, password) {
        return this.system.login(username, password);
    };
    ApiView.prototype.logout = function (username) {
        return this.system.logout(username);
    };
    ApiView.prototype.update = function (username, user) {
        var _this = this;
        return new Promise(function (fulfill, reject) {
            var numericDate = user.date_of_birth;
            var textualDate = _this.textualizeDate(numericDate);
            user.date_of_birth = textualDate;
            _this.validate.user(user)
                .then(function () {
                _this.system.replaceUser(username, user)
                    .then(function (res) {
                    fulfill(res);
                })
                    .catch(function (err) {
                    reject(err);
                });
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    ApiView.prototype.delete = function (username) {
        return this.system.removeUser(username);
    };
    ApiView.prototype.textualizeDate = function (numericDate) {
        var months = ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"];
        var splittedDate = numericDate.split("-");
        var year = splittedDate[0];
        var month = months[parseInt(splittedDate[1]) - 1];
        var day = splittedDate[2];
        return month + ' ' + day + ', ' + year;
    };
    ApiView.prototype.numeralizeDate = function (textualDate) {
        var months = ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"];
        var splittedDate = textualDate.split(" ");
        var year = splittedDate[2];
        var month = months.indexOf(splittedDate[0]) + 1;
        var day = parseInt(splittedDate[1]);
        month = (month <= 9) ? '0' + month : month;
        day = (day <= 9) ? '0' + day : day;
        return year + '-' + month + '-' + day;
    };
    return ApiView;
}());
exports.default = ApiView;
