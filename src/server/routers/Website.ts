import express, { Router } from 'express';
import { IUser } from '../../controller/ISystem';
import System from '../../controller/System';
import Server from '../Server';

const router: Router = express.Router();
let system: System; 

setImmediate(() => system = Server.getSystem());


declare module 'express-session' {
  export interface SessionData {
    user: string;
  }
}

router.get("/", (req, res) => {
    console.log("GET: '/'");
    if (req.session.user) {
      console.log('Redirect: /home');
      res.redirect('/home');
    } else {
      console.log('Render: index.pug');
      res.render("index");
    }
});

router.get('/home', (req, res) => {
  console.log("GET: '/home'");
  if(req.session.user) {
    let user: IUser, online: IUser[], offline: IUser[];
    system.getUser(req.session.user as string)
    .then((userRes) =>    {user = userRes.data;         return system.getActiveUsers()})
    .then((onlineRes) =>  {online = onlineRes.data;     return system.getInactiveUsers()})
    .then((offlineRes) => {offline = offlineRes.data
      console.log('Render: home.pug');
      res.render('home', {user, online, offline})
    })
    .catch(() => {
      console.log('Render: error.pug');
      res.render('error', {message: 'Internal error'})
    })
  } else {
    console.log("Redirect: '/'")
    res.redirect('/');
  }
});

router.post("/register", (req, res) => {
  console.log("POST: '/register'");
  if(req.session.user) {
    console.log('Render: error.pug');
    res.render('error', {message: 'You have to logout to create a new account'});
  } else if (!req.body.first_name || !req.body.last_name || !req.body.gender || !req.body.date_of_birth ||
             !req.body.username   || !req.body.password  || !req.body.email) {
    console.log('Render: error.pug');
    res.render('error', {message: 'You have to fill out the all required fields'});
          
  } else {
    const newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      gender: req.body.gender,
      date_of_birth: req.body.date_of_birth,
      secret: {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
      }
    }
    system.addUser(newUser).then(() => {
      req.session.user = req.body.username;
      res.render('success', {message: 'Congrats: You have been registered correctly'});
    }, (err) => {
      console.log('Render: error.pug');
      res.render('error', {message: err.message});
    });
  }

});

router.post("/login", async (req, res) => {
  console.log("POST: '/login'");
  if (req.session.user) {
    console.log('Render: error.pug');
    res.render('error', {message: 'You are already logged in'});
  } else if (!req.body.username || !req.body.password) {
    console.log('Render: error.pug');
    res.render('error', {message: 'You have to fill out the both username and password'});
  } else {
    const username = req.body.username;
    const password = req.body.password;
    system.login(username, password).then(() => {
      req.session.user = username;
      console.log("Redirect: '/'");
      res.redirect('/home');
    }, () => {
      console.log('Render: error.pug');
      res.render('error', {message: 'The given username or password are wrong'});
    });
  }
});

router.get("/logout", (req, res) => {
  console.log("GET: '/logout'");
  if (req.session.user) {
    system.logout(req.session.user as string).then((sysRes) => {
        req.session.destroy((err) => err? (res.render("error", {message: 'Internal Error'})) : '');
        console.log("Redirect: '/'")
        res.redirect('/')
      }, (err) => {
      console.log('Render: error.pug');
      res.render('error', {message: 'Internal Error'});
    });

  } else {
    console.log('Render: error.pug');
    res.render('error', {message: 'Loggin first to logout'});
  }
});

router.put("/update", (req, res) => {
  console.log("PUT: '/update'");
  console.log(JSON.parse(req.body.newUser)); /* TEMP */
  if (req.session.user && req.body.newUser) {
    system.replaceUser(req.session.user, JSON.parse(req.body.newUser)).then(() => {
      req.session.user = JSON.parse(req.body.newUser).secret.username;
      console.log("Json: {redirect: '/'}");
      res.json({redirect: '/'}).end();
    }, (err) =>{
      console.log('Render: error.pug');
      res.render('error', {message: 'Internal Error'});
    })
  } else if (!req.body.newUser) {
        console.log('Render: error.pug');
      res.render('error', {message: 'You have to pass correct information to update your info'});
  } else {
    console.log('Render: error.pug');
    res.render('error', {message: 'Login first to delete your account'});
  }
});

router.delete("/delete", (req, res) => {
  console.log("DELETE: '/register'");
  if (req.session.user) {
    system.removeUser(req.session.user).then(() => {
      req.session.destroy((err) => err? (res.render("error", {message: 'Internal Error'})) : '');
      console.log("Json: {redirect: '/'}");
      res.json({redirect: '/'}).end();
    }, () =>{
      console.log('Render: error.pug');
      res.render('error', {message: 'Internal Error'});
    })
  } else {
    console.log('Render: error.pug');
    res.render('error', {message: 'Login first to delete your account'});
  }
});

router.get('*', (req, res) => {
  console.log("GET: *");
  console.log("Render: error.pug");
  res.render('error', {message: 'The page that you tries to reach is Not Found.'});

});

export default router;