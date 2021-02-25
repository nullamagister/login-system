"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ISystem_1 = require("../../controller/ISystem");
var server_1 = __importDefault(require("../server"));
var router = express_1.default.Router();
var system;
setImmediate(function () { return system = server_1.default.getSystem(); });
router.post("/register", function (req, res) {
    if (!req.body.first_name || !req.body.last_name || !req.body.gender || !req.body.date_of_birth ||
        !req.body.username || !req.body.password || !req.body.email) {
        return res.status(400).json({ code: 400, message: "You have to provide all fields" });
    }
    var newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date_of_birth: req.body.date_of_birth,
        gender: req.body.gender.toLowerCase() == 'male' ? ISystem_1.Gender.Male : ISystem_1.Gender.Female,
        secret: {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        }
    };
    system.addUser(newUser).then(function (sysRes) {
        res.json(sysRes);
    }, function (err) {
        res.status(400).json(err);
    });
});
router.post("/login", function (req, res) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ code: 400, message: "Incorrect: username or password" });
    }
    var username = req.body.username;
    var password = req.body.password;
    system.login(username, password).then(function (sysRes) {
        req.session.user = username;
        res.json(sysRes);
    }, function (err) {
        res.status(400).json(err);
    });
});
router.get("/logout", function (req, res) {
    if (!req.session.user) {
        return res.status(400).json({ code: 400, message: "You are not logged in to logout" });
    }
    system.logout(req.session.user).then(function (sysRes) {
        req.session.destroy(function (err) { return res.status(400).json(err); });
        res.json(sysRes);
    }, function (err) {
        res.status(400).json(err);
    });
});
router.put("/update", function (req, res) {
    if (!req.session.user) {
        return res.status(400).json({ code: 400, message: "You have to login first" });
    }
    if (!req.body.first_name || !req.body.last_name || !req.body.gender || !req.body.date_of_birth ||
        !req.body.username || !req.body.password || !req.body.email) {
        return res.status(400).json({ code: 400, message: "You have to provide all fields" });
    }
    var username = req.session.user;
    var newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date_of_birth: req.body.date_of_birth,
        gender: req.body.gender.toLowerCase() == 'male' ? ISystem_1.Gender.Male : ISystem_1.Gender.Female,
        secret: {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        }
    };
    system.replaceUser(username, newUser).then(function (sysRes) {
        res.json(sysRes);
    }, function (err) {
        res.status(400).json(err);
    });
});
router.delete("/delete", function (req, res) {
    if (!req.session.user) {
        return res.status(400).json({ code: 400, message: "You have to login first" });
    }
    var username = req.session.user;
    system.removeUser(username).then(function (sysRes) {
        res.json(sysRes);
        req.session.destroy(function (err) { return res.status(400).json(err); });
    }, function (err) {
        res.status(400).json(err);
    });
});
exports.default = router;
