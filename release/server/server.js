"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var multer_1 = __importDefault(require("multer"));
var express_session_1 = __importDefault(require("express-session"));
var System_1 = __importDefault(require("../controller/System"));
var api_1 = __importDefault(require("./routers/api"));
var index_1 = __importDefault(require("./routers/index"));
var Server = /** @class */ (function () {
    function Server(port, host) {
        this.port = port;
        this.host = host;
        this.app = express_1.default();
        this.httpServer = http_1.default.createServer(this.app);
        this.middlewares();
        this.routers();
    }
    Server.prototype.start = function () {
        var _this = this;
        this.httpServer.listen(this.port, this.host, function () {
            console.log("Http server is running at: " + _this.host + ":" + _this.port);
        });
    };
    Server.prototype.run = function () {
        this.httpServer.close(function (err) {
            if (err) {
                return err;
            }
            console.log('Server is closed');
        });
    };
    Server.getSystem = function () {
        return Server.system;
    };
    Server.prototype.middlewares = function () {
        // Body Parser
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use(body_parser_1.default.json());
        // Cookie Parser
        this.app.use(cookie_parser_1.default());
        // Multer
        var upload = multer_1.default();
        this.app.use(upload.array('upload'));
        // Session
        var key = this.secretKeyGenerator();
        this.app.use(express_session_1.default({ secret: key, resave: true, saveUninitialized: true }));
        // Static files
        this.app.use('/view', express_1.default.static('public'));
        // Template Engine
        this.app.set('view engine', 'pug');
    };
    Server.prototype.routers = function () {
        this.app.use('/api', api_1.default);
        this.app.use('/', index_1.default);
    };
    Server.prototype.secretKeyGenerator = function () {
        var symobols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
            'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
            'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
            'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '@',
            '#', '$', '%', '^', '&', '&', '*'];
        var secret = "";
        for (var i = 0; i < 28; i++) {
            secret = secret + symobols[this.randomNumber(symobols.length)];
        }
        return secret;
    };
    Server.prototype.randomNumber = function (maxNumber) {
        var maxDigit = 10000;
        return (Math.floor(Math.random() * maxDigit) % maxNumber);
    };
    Server.system = new System_1.default();
    return Server;
}());
exports.default = Server;