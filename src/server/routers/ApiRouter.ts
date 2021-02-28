import express, { Router } from 'express';
import { Gender, IUser } from '../../controller/ISystem';
import ApiView from '../../view/ApiView';
import Server from '../Server';

const router: Router   = express.Router();
let apiView: ApiView;

setImmediate(() => apiView = new ApiView(Server.getDB()));

declare module 'express-session' {
  export interface SessionData {
    user: string;
  }
}

router.post("/register", (req, res) => {
    console.log("POST: api/register");
    if (!req.body.first_name || !req.body.last_name || !req.body.gender || !req.body.date_of_birth ||
        !req.body.username || !req.body.password || !req.body.email) {
        console.log("Json: failed");
        return res.status(400).json({code: 400, message: "You have to provide all fields"});
    }

    if (!['male', 'female'].includes((<string>req.body.gender).toLocaleLowerCase())) {
        return res.status(400).json({code: 400, message: "Gender must be either male or female"});
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

    apiView.register(newUser).then((sysRes) => {
        console.log("Json: succees");
        res.json(sysRes)
    }, (err) => {
        console.log("Json: faild");
        res.status(400).json(err);
    });
});

router.post("/login", (req, res) => {
    console.log("POST: api/login")
    if (!req.body.username || !req.body.password) {
        console.log("Json: faild");
        return res.status(400).json({code: 400, message: "Incorrect: missed to fill out username or password"});
    }

    const username = req.body.username;
    const password = req.body.password;

    apiView.login(username, password).then((sysRes) => {
        req.session.user = username;
        console.log("Json: success");
        res.json(sysRes);
    }, (err) => {
        console.log("Json: faild");
        res.status(400).json(err);
    });
});

router.get("/logout", (req, res) => {
    console.log("GET: api/logout");
    if (!req.session.user) {
        console.log("Json: faild");
        return res.status(400).json({code: 400, message: "You are not logged in to logout"});
    }
    apiView.logout(req.session.user).then((sysRes) => {
        req.session.destroy((err) => res.status(400).json(err));
        console.log("Json: success");
        res.json(sysRes);
    }, (err) => {
        console.log("Json: faild");
        res.status(400).json(err);
    });
});

router.put("/update", (req, res) => {
    console.log("PUT: api/update");
    if (!req.session.user) {
        console.log("Json: faild");
        return res.status(400).json({code: 400, message: "You have to login first"});
    }

    if (!['male', 'female'].includes((<string>req.body.gender).toLocaleLowerCase())) {
        return res.status(400).json({code: 400, message: "Gender must be either male or female"});
    }

    if (!req.body.first_name || !req.body.last_name || !req.body.gender || !req.body.date_of_birth ||
        !req.body.username || !req.body.password || !req.body.email) {
        console.log("Json: faild");
        return res.status(400).json({code: 400, message: "You have to fill out all fields"});
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

    apiView.update(username, newUser).then((sysRes) => {
        console.log("Json: success");
        res.json(sysRes)
    }, (err) => {
        console.log("Json: faild");
        res.status(400).json(err);
    });
});

router.delete("/delete", (req, res) => {
    console.log("DELETE: api/delete");
    if (!req.session.user) {
        console.log("Json: faild");
        return res.status(400).json({code: 400, message: "You have to login first"});
    }

    const username = req.session.user;
    apiView.delete(username).then((sysRes) => {
        console.log("Json: success");
        res.json(sysRes);
        req.session.destroy((err) => res.status(400).json(err));
    }, (err) => {
        console.log("Json: faild");
        res.status(400).json(err);
    });
});

export default router;