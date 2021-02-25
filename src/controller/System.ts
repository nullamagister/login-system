import Mongodb from "../model/Mongodb";
import IResponse from "./IResponse";
import ISystem, { IUser } from "./ISystem";
import Validate from "./Validate";

/**
 * This is our class of our Login System
 */
export default class System implements ISystem{
    private readonly databaseURL = 'mongodb://127.0.0.1:27017/myData';

    private mongodb: Mongodb;
    private validate: Validate;
    private users: IUser[];
    private activeUsers: IUser[];

    /**
     * Connect to database.
     * Retrieve users from database and store it in memory.
     */
    constructor() {
        this.mongodb = new Mongodb(this.databaseURL);
        this.validate = new Validate();
        this.users = [];
        this.activeUsers = [];
        
        this.connectDatabase().then(() => {
            this.mongodb.getUsers().then((res) => this.users = res.data, (err) => this.users = []);
        });
    }

    public connectDatabase(): Promise<IResponse> {
        return new Promise((fulfill, reject) => {
            this.mongodb.connect().then((res) => {
                fulfill(res);
            }, (err) => {
                reject(err);
            });
        });
    }

    public disconnectDatabase(): Promise<IResponse> {
        return new Promise((fulfill, reject) => {
            this.mongodb.disconnect().then((res) => {
                fulfill(res);
            }, (err) => {
                reject(err);
            });
        });
    }

    public getUsers(): Promise<IResponse> {
        return new Promise((fulfill, reject) => {
            fulfill({
                code: 200,
                message: "a list of all regestered users",
                data: this.users
            });
        });
    }

    public getActiveUsers(): Promise<IResponse> {
        return new Promise((fulfill, reject) => {
            fulfill({
                code: 200,
                message: "a list of all active users",
                data: this.activeUsers
            });
        });
    }

    public login(username: string, password: string): Promise<IResponse> {
        return new Promise((fulfill, reject) => {
            const isActive = (this.activeUsers.filter((user) => user.secret.username == username)).length == 1;
            if (isActive) {
                reject({
                    code: 400,
                    message: "the user is already logged in"
                });
            }

            const notExist = (this.users.filter((user) => user.secret.username == username)).length == 0;
            if (notExist) {
                reject({
                    code: 400,
                    message: "the given username is incorrect"
                });
            }

            const user = (this.users.filter((user) => user.secret.username == username))[0];
            if (user.secret.password == password) {
                this.activeUsers.push(user);
                fulfill({
                    code: 200,
                    message: "logged in successfully"
                });
            } else {
                reject({
                    code: 400,
                    message: "the given password is incorrect"
                });
            }
            
        });
    }
    
    public logout(username: string): Promise<IResponse> {
        return new Promise((fulfill, reject) => {
            const notActive = (this.activeUsers.filter((user) => user.secret.username == username)).length == 0;
            if (notActive) {
                reject({
                    code: 400,
                    message: "the given username is not active"
                });
            } else {
                for (let i = 0; i < this.activeUsers.length; i++) {
                    if (this.activeUsers[i].secret.username == username) {
                        this.activeUsers.splice(i, 1);
                        fulfill({
                            code: 200,
                            message: "logged out successfully"
                        });
                        break;
                    }
                }
            }
        });
    }
    
    public addUser(user: IUser): Promise<IResponse> {
        return new Promise(async (fulfill, reject) => {
            try {
                await this.validate.user(user);
                const username = user.secret.username;
                if (this.users.filter((user) => user.secret.username == username).length == 0) {
                    this.mongodb.addUser(user).then(() => {
                        this.users.push(user);
                        fulfill({
                            code: 200,
                            message: "registered successfully"
                        });
                    }, (err) => {
                        reject(err);
                    })
                    
                } else {
                    reject({
                        code: 400,
                        message: "the given username has already exist"
                    });
                }

            } catch (err) {
                reject(err);
            }
        });
    }
    
    public replaceUser(username: string, user: IUser): Promise<IResponse> {
        return new Promise(async (fulfill, reject) => {
            const wrappedOld =
                this.users.filter((user) => user.secret.username == username);
            
            // check whether the user to be updated exists
            if (wrappedOld.length != 1) {
                reject({
                    code: 400,
                    message: "the given username is not exist"
                });
            }

            // Check the updated data validation
            try {
                await this.validate.user(user);
            } catch (err) {
                reject(err);
            } 
            
            // Has a new existed username
            const wrappedUser = 
                this.users.filter((_user) => _user.secret.username == user.secret.username);

            if (wrappedUser.length == 1) {
                if (wrappedOld[0].secret.username != user.secret.username) {
                    reject({
                        code: 400,
                        message: "the given username is already exists"
                    });
                }
            }

            // Replace user
            for (let i = 0; i < this.users.length; i++){
                if (this.users[i].secret.username == username) {
                    const replaced: IUser = {
                        first_name: user.first_name,
                        last_name: user.last_name,
                        date_of_birth: user.date_of_birth,
                        gender: user.gender,
                        secret: {
                            username: user.secret.username,
                            password: user.secret.password,
                            email: user.secret.email
                        }
                    }
                    this.mongodb.replaceUser(username, replaced).then(() => {
                        this.users[i] = replaced
                        fulfill({
                            code: 200,
                            message: "update successfully"
                        });
                    }, (err) => {
                        reject(err);
                    })
                    break;
                }
            }
        })
    }

    public removeUser(username: string): Promise<IResponse> {
        return new Promise((fulfill, reject) => {
            const wrappedUser =
                this.users.filter((user) => user.secret.username == username);
            
            // check whether the user to be deleted exists
            if (wrappedUser.length != 1) {
                reject({
                    code: 400,
                    message: "the given username is not exist"
                });
            }
            
            for (let i = 0; i < this.users.length; i++){
                if (this.users[i].secret.username == username) {
                    this.mongodb.removeUser(username).then(() => {
                        this.users.splice(i, 1);
                        fulfill({
                            code: 200,
                            message: "deleted successfully"
                        });
                    }, (err) => {
                        reject(err);
                    });
                    break;
                }
            }
        })
    }
}