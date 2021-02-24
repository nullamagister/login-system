import IResponse from "./IResponse";
import { IUser } from "./ISystem";
import IValidate from "./IValidator";

/**
 * This is our Validator class
 */
export default class Validate implements IValidate{
    
    public user(user: IUser): Promise<IResponse> {
        return new Promise(async (fulfill, reject) => {
            try {
                await this.name(user.first_name);
                await this.name(user.last_name);
                await this.date(user.date_of_birth);
                await this.username(user.secret.username);
                await this.password(user.secret.password);
                await this.email(user.secret.email);

                fulfill({
                    code: 202,
                    message: "The given User information are valid"
                });

            } catch (err) {
                reject(err);
            }
        })
    }

    private name(name: string): Promise<IResponse> {
        return new Promise((fulfill, reject) => {
            if (/^[a-zA-Z]+$/.test(name) && name.length >= 7 && name.length <= 20) {
                fulfill({
                    code: 202,
                    message: "The given name is valid"
                });
            } else {
                reject({
                    code: 402,
                    message: "The given name is invalid"
                });
            }
        });
    }

    private date(date: string): Promise<IResponse> {
        return new Promise((fulfill, reject) => {
            const dateList = date.split(" ");
            const months   = ["January", "February", "March", "April", "May", "June", "July",
                              "August", "September", "October", "November", "December"]

            const month = dateList[0];
            const day   = parseInt(dateList[1]);
            const year  = parseInt(dateList[2]);

            if (months.includes(month) && day >= 1 && day <= 32 && year >= 1940 && year <= 2010) {
                fulfill({
                    code: 202,
                    message: "The given date is valid"
                });
            } else {
                reject({
                    code: 402,
                    message: "The given date is invalid"
                });
            }

        });
    }

    private username(username: string): Promise<IResponse> {
        return new Promise((fulfill, reject) => {
            if (/^[a-zA-Z0-9]+$/.test(username) && username.length >= 7 && username.length <= 16) {
                fulfill({
                    code: 202,
                    message: "The given username is valid"
                });
            } else {
                reject({
                    code: 402,
                    message: "The given username is invalid"
                });
            }
        });
    }

    private password(password: string): Promise<IResponse> {
        return new Promise((fulfill, reject) => {
            if (/[A-Z]/.test(password) && password.length >= 9 && password.length <= 20) {
                fulfill({
                    code: 202,
                    message: "The given password is valid"
                });
            } else {
                reject({
                    code: 402,
                    message: "The given password is invalid"
                });
            }
        })
    }

    private email(email: string): Promise<IResponse> {
        return new Promise((fulfill, reject) => {
            if( /^[a-zA-Z@.]+$/.test(email) && email.split("@").length == 2 && email.split(".").length == 2) {
                fulfill({
                    code: 202,
                    message: "The given email is valid"
                });
            } else {
                reject({
                    code: 402,
                    message: "The given email is invalid"
                });
            }
        });
    }
}