"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ISystem_1 = require("../../controller/ISystem");
var ApiView_1 = __importDefault(require("../../view/ApiView"));
var Server_1 = __importDefault(require("../Server"));
var router = express_1.default.Router();
var apiView;
setImmediate(function () { return apiView = new ApiView_1.default(Server_1.default.getDB()); });
router.post("/register", function (req, res) {
    console.log("POST: api/register");
    if (!req.body.first_name || !req.body.last_name || !req.body.gender || !req.body.date_of_birth ||
        !req.body.username || !req.body.password || !req.body.email) {
        console.log("Json: failed");
        return res.status(400).json({ code: 400, message: "You have to provide all fields" });
    }
    if (!['male', 'female'].includes(req.body.gender.toLocaleLowerCase())) {
        return res.status(400).json({ code: 400, message: "Gender must be either male or female" });
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
    apiView.register(newUser).then(function (sysRes) {
        console.log("Json: succees");
        res.json(sysRes);
    }, function (err) {
        console.log("Json: faild");
        res.status(400).json(err);
    });
});
router.post("/login", function (req, res) {
    console.log("POST: api/login");
    if (!req.body.username || !req.body.password) {
        console.log("Json: faild");
        return res.status(400).json({ code: 400, message: "Incorrect: missed to fill out username or password" });
    }
    var username = req.body.username;
    var password = req.body.password;
    apiView.login(username, password).then(function (sysRes) {
        req.session.user = username;
        console.log("Json: success");
        res.json(sysRes);
    }, function (err) {
        console.log("Json: faild");
        res.status(400).json(err);
    });
});
router.get("/logout", function (req, res) {
    console.log("GET: api/logout");
    if (!req.session.user) {
        console.log("Json: faild");
        return res.status(400).json({ code: 400, message: "You are not logged in to logout" });
    }
    apiView.logout(req.session.user).then(function (sysRes) {
        req.session.destroy(function (err) { return res.status(400).json(err); });
        console.log("Json: success");
        res.json(sysRes);
    }, function (err) {
        console.log("Json: faild");
        res.status(400).json(err);
    });
});
router.put("/update", function (req, res) {
    console.log("PUT: api/update");
    if (!req.session.user) {
        console.log("Json: faild");
        return res.status(400).json({ code: 400, message: "You have to login first" });
    }
    if (!['male', 'female'].includes(req.body.gender.toLocaleLowerCase())) {
        return res.status(400).json({ code: 400, message: "Gender must be either male or female" });
    }
    if (!req.body.first_name || !req.body.last_name || !req.body.gender || !req.body.date_of_birth ||
        !req.body.username || !req.body.password || !req.body.email) {
        console.log("Json: faild");
        return res.status(400).json({ code: 400, message: "You have to fill out all fields" });
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
    apiView.update(username, newUser).then(function (sysRes) {
        console.log("Json: success");
        res.json(sysRes);
    }, function (err) {
        console.log("Json: faild");
        res.status(400).json(err);
    });
});
router.delete("/delete", function (req, res) {
    console.log("DELETE: api/delete");
    if (!req.session.user) {
        console.log("Json: faild");
        return res.status(400).json({ code: 400, message: "You have to login first" });
    }
    var username = req.session.user;
    apiView.delete(username).then(function (sysRes) {
        console.log("Json: success");
        res.json(sysRes);
        req.session.destroy(function (err) { return res.status(400).json(err); });
    }, function (err) {
        console.log("Json: faild");
        res.status(400).json(err);
    });
});
exports.default = router;
