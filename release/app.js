"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Server_1 = __importDefault(require("./server/Server"));
var App = /** @class */ (function () {
    function App(port, host, db) {
        this.server = new Server_1.default(port, host, db);
    }
    App.prototype.start = function () { this.server.listen(); };
    App.prototype.stop = function () { this.server.close(); };
    return App;
}());
var args = process.argv.slice(2);
var port = args[0] ? parseInt(args[0]) : 8080;
var host = args[1] ? args[1] : 'localhost';
var db = args[2] ? args[2] : 'mongodb://127.0.0.1:27017/loginSystem';
var app = new App(port, host, db);
app.start();
