"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Server_1 = __importDefault(require("./server/Server"));
var App = /** @class */ (function () {
    function App(port, host) {
        this.server = new Server_1.default(port, host);
    }
    App.prototype.run = function () { this.server.start(); };
    App.prototype.stop = function () { this.server.run(); };
    return App;
}());
var app = new App(8080, 'localhost');
app.run();
