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
var express_1 = __importDefault(require("express"));
var Server_1 = __importDefault(require("../Server"));
var router = express_1.default.Router();
var system;
setImmediate(function () { return system = Server_1.default.getSystem(); });
router.get("/", function (req, res) {
    console.log("GET: '/'");
    if (req.session.user) {
        console.log('Redirect: /home');
        res.redirect('/home');
    }
    else {
        console.log('Render: index.pug');
        res.render("index");
    }
});
router.get('/home', function (req, res) {
    console.log("GET: '/home'");
    if (req.session.user) {
        var user_1, online_1, offline_1;
        system.getUser(req.session.user)
            .then(function (userRes) { user_1 = userRes.data; return system.getActiveUsers(); })
            .then(function (onlineRes) { online_1 = onlineRes.data; return system.getInactiveUsers(); })
            .then(function (offlineRes) {
            offline_1 = offlineRes.data;
            console.log('Render: home.pug');
            res.render('home', { user: user_1, online: online_1, offline: offline_1 });
        })
            .catch(function () {
            console.log('Render: error.pug');
            res.render('error', { message: 'Internal error' });
        });
    }
    else {
        console.log("Redirect: '/'");
        res.redirect('/');
    }
});
router.post("/register", function (req, res) {
    console.log("POST: '/register'");
    if (req.session.user) {
        console.log('Render: error.pug');
        res.render('error', { message: 'You have to logout to create a new account' });
    }
    else if (!req.body.first_name || !req.body.last_name || !req.body.gender || !req.body.date_of_birth ||
        !req.body.username || !req.body.password || !req.body.email) {
        console.log('Render: error.pug');
        res.render('error', { message: 'You have to fill out the all required fields' });
    }
    else {
        var newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            gender: req.body.gender,
            date_of_birth: req.body.date_of_birth,
            secret: {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
            }
        };
        system.addUser(newUser).then(function () {
            req.session.user = req.body.username;
            res.render('success', { message: 'Congrats: You have been registered correctly' });
        }, function (err) {
            console.log('Render: error.pug');
            res.render('error', { message: err.message });
        });
    }
});
router.post("/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username_1, password;
    return __generator(this, function (_a) {
        console.log("POST: '/login'");
        if (req.session.user) {
            console.log('Render: error.pug');
            res.render('error', { message: 'You are already logged in' });
        }
        else if (!req.body.username || !req.body.password) {
            console.log('Render: error.pug');
            res.render('error', { message: 'You have to fill out the both username and password' });
        }
        else {
            username_1 = req.body.username;
            password = req.body.password;
            system.login(username_1, password).then(function () {
                req.session.user = username_1;
                console.log("Redirect: '/'");
                res.redirect('/home');
            }, function () {
                console.log('Render: error.pug');
                res.render('error', { message: 'The given username or password are wrong' });
            });
        }
        return [2 /*return*/];
    });
}); });
router.get("/logout", function (req, res) {
    console.log("GET: '/logout'");
    if (req.session.user) {
        system.logout(req.session.user).then(function (sysRes) {
            req.session.destroy(function (err) { return err ? (res.render("error", { message: 'Internal Error' })) : ''; });
            console.log("Redirect: '/'");
            res.redirect('/');
        }, function (err) {
            console.log('Render: error.pug');
            res.render('error', { message: 'Internal Error' });
        });
    }
    else {
        console.log('Render: error.pug');
        res.render('error', { message: 'Loggin first to logout' });
    }
});
router.put("/update", function (req, res) {
    console.log("PUT: '/update'");
    console.log(JSON.parse(req.body.newUser)); /* TEMP */
    if (req.session.user && req.body.newUser) {
        system.replaceUser(req.session.user, JSON.parse(req.body.newUser)).then(function () {
            req.session.user = JSON.parse(req.body.newUser).secret.username;
            console.log("Json: {redirect: '/'}");
            res.json({ redirect: '/' }).end();
        }, function (err) {
            console.log('Render: error.pug');
            res.render('error', { message: 'Internal Error' });
        });
    }
    else if (!req.body.newUser) {
        console.log('Render: error.pug');
        res.render('error', { message: 'You have to pass correct information to update your info' });
    }
    else {
        console.log('Render: error.pug');
        res.render('error', { message: 'Login first to delete your account' });
    }
});
router.delete("/delete", function (req, res) {
    console.log("DELETE: '/register'");
    if (req.session.user) {
        system.removeUser(req.session.user).then(function () {
            req.session.destroy(function (err) { return err ? (res.render("error", { message: 'Internal Error' })) : ''; });
            console.log("Json: {redirect: '/'}");
            res.json({ redirect: '/' }).end();
        }, function () {
            console.log('Render: error.pug');
            res.render('error', { message: 'Internal Error' });
        });
    }
    else {
        console.log('Render: error.pug');
        res.render('error', { message: 'Login first to delete your account' });
    }
});
router.get('*', function (req, res) {
    console.log("GET: *");
    console.log("Render: error.pug");
    res.render('error', { message: 'The page that you tries to reach is Not Found.' });
});
exports.default = router;
