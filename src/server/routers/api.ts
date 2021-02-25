import express, { Router } from 'express';
import { Gender, IUser } from '../../controller/ISystem';
import System from '../../controller/System';
import Server from '../server';

const router: Router = express.Router();
let system: System; 

setImmediate(() => system = Server.getSystem());


declare module 'express-session' {
  export interface SessionData {
    user: string;
  }
}

router.post("/register", (req, res) => {
    if (!req.body.first_name || !req.body.last_name || !req.body.gender || !req.body.date_of_birth ||
        !req.body.username || !req.body.password || !req.body.email) {
        return res.status(400).json({code: 400, message: "You have to provide all fields"});
    }

    const newUser: IUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date_of_birth: req.body.date_of_birth,
        gender: (<string>req.body.gender).toLowerCase() == 'male' ?  Gender.Male: Gender.Female,
        secret: {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        }
    }

    system.addUser(newUser).then((sysRes) => {
        res.json(sysRes)
    }, (err) => {
        res.status(400).json(err);
    });
});

router.post("/login", (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({code: 400, message: "Incorrect: username or password"});
    }

    const username = req.body.username;
    const password = req.body.password;

    system.login(username, password).then((sysRes) => {
        req.session.user = username;
        res.json(sysRes);
    }, (err) => {
        res.status(400).json(err);
    });
});

router.get("/logout", (req, res) => {
    if (!req.session.user) {
        return res.status(400).json({code: 400, message: "You are not logged in to logout"});
    }
    system.logout(req.session.user).then((sysRes) => {
        req.session.destroy((err) => res.status(400).json(err));
        res.json(sysRes);
    }, (err) => {
        res.status(400).json(err);
    });
});

router.put("/update", (req, res) => {
    if (!req.session.user) {
        return res.status(400).json({code: 400, message: "You have to login first"});
    }

    if (!req.body.first_name || !req.body.last_name || !req.body.gender || !req.body.date_of_birth ||
        !req.body.username || !req.body.password || !req.body.email) {
        return res.status(400).json({code: 400, message: "You have to provide all fields"});
    }

    const username = req.session.user;
    const newUser: IUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date_of_birth: req.body.date_of_birth,
        gender: (<string>req.body.gender).toLowerCase() == 'male' ?  Gender.Male: Gender.Female,
        secret: {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        }
    };

    system.replaceUser(username, newUser).then((sysRes) => {
        res.json(sysRes)
    }, (err) => {
        res.status(400).json(err);
    });});

router.delete("/delete", (req, res) => {
    if (!req.session.user) {
        return res.status(400).json({code: 400, message: "You have to login first"});
    }

    const username = req.session.user;
    system.removeUser(username).then((sysRes) => {
        res.json(sysRes);
        req.session.destroy((err) => res.status(400).json(err));
    }, (err) => {
        res.status(400).json(err);
    });
});

export default router;