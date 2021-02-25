import IResponse from "../controller/IResponse";
import { IUser } from "../controller/ISystem";
import IMongodb from "./IMongodb";
import mongoose from "mongoose";
import User from './User';

export default class Mongodb implements IMongodb {
    private url: string

    constructor(url: string) {
        this.url = url;
    }

    public connect(): Promise<IResponse> {
        return new Promise(async (fulfill, reject) => {
            mongoose.connect(this.url, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
                console.log("Databased opened successfully");
                fulfill({
                    code: 204,
                    message: "Databased opened successfully"
                });
            }, () => {
                console.log("Error: unable to open database");
                reject({
                    code: 404,
                    message: "Error: unable to open database"
                });
            });
        });
    }

    public disconnect(): Promise<IResponse> {
        return new Promise(async (fulfill, reject) => {
            mongoose.disconnect().then(() => {
                console.log("Databased closed successfully");
                fulfill({
                    code: 204,
                    message: "Databased closed successfully"
                });
            }, () => {
                console.log("Error: unable to close database");
                reject({
                    code: 404,
                    message: "Error: unable to close database"
                });
            });
        });
    }

    public destroy(): Promise<IResponse>{
        return new Promise((fulfill, reject) => {
            User.db.dropDatabase().then(() => {
                console.log("Databased destroyed successfully");
                fulfill({
                    code: 204,
                    message: "Databased destroyed successfully"
                });
            }, (err) => {
                console.log("Error: unable to destroy database");
                reject({
                    code: 404,
                    message: "Error: Failed to destroy database"
                });
            });
        });
    }

    public getUsers(): Promise<IResponse> {
        return new Promise((fulfill, reject) => {
            User.find((err, docs) => {
                if(err) {
                    reject({
                        code: 404,
                        message: "Error: unable to retrieve all users from database"
                    });
                }

                fulfill({
                    code: 204,
                    message: "Getting all users from database successfully",
                    data: docs
                });
            })
        });
    }

    public addUser(user: IUser): Promise<IResponse> {
        return new Promise((fulfill, reject) => {
            const newUser = new User(user);
                newUser.save().then((docs) => {
                    fulfill({
                        code: 204,
                        message: "The given user added to the database successfully"
                    });
                }, (err) => {
                    reject({
                        code: 404,
                        message: "Error: unable to add the given user to the database"
                    });
                });
        })
    }

    public replaceUser(username: string, user: IUser): Promise<IResponse> {
        return new Promise((fulfill, reject) => {
            const newUser = new User(user);
            const newUserObjWithoutId: any = newUser.toObject();
            delete newUserObjWithoutId._id
            delete newUserObjWithoutId.secret._id
            User.replaceOne({'secret.username': username}, newUserObjWithoutId).then((res) => {
                if (res.nModified == 0) {
                    reject({
                        code: 404,
                        message: "Error: unable to replace the given user"
                    });
                }

                fulfill({
                    code: 204,
                    message: "The given username user replaced successfully"
                });
            }, (err) => {
                reject({
                    code: 404,
                    message: "Error: unable to replace the given user"
                });
            });
        });
    }

    public removeUser(username: string): Promise<IResponse> {
        return new Promise((fulfill, reject) => {
            User.deleteOne({'secret.username': username}).then((res) => {
                if (res.deletedCount == 0) {
                    reject({
                        code: 404,
                        message: "Error: unable to remove the given user"
                    });
                }

                fulfill({
                    code: 204,
                    message: "The given username user removed successfully"
                });
            }, () => {
                reject({
                    code: 404,
                    message: "Error: unable to remove the given user"
                });
            });
        });
    }
}