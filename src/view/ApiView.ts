import { rejects } from "assert";
import IResponse from "../controller/IResponse";
import { IUser } from "../controller/ISystem";
import System from "../controller/System"
import IApiView from "./IApiView";
import Validate from "./Validate";


export default class ApiView implements IApiView{
    protected system: System;
    protected validate: Validate;

    constructor(db: string) {
        this.system   = System.getSystem(db);
        this.validate = new Validate();
    }

    public register(user: IUser): Promise<IResponse> {
        return new Promise((fulfill, reject) => {
            const numericDate = user.date_of_birth;
            const textualDate = this.textualizeDate(numericDate);
            user.date_of_birth = textualDate;
            this.validate.user(user)
            .then(() => this.system.addUser(user))
            .then((res) => fulfill(res))
            .catch((err) =>  reject(err));
        });
    }

    public login(username: string, password: string): Promise<IResponse> {
        return this.system.login(username, password);
    }

    public logout(username: string): Promise<IResponse> {
        return this.system.logout(username);
    }

    public update(username: string, user: IUser): Promise<IResponse> {
        return new Promise((fulfill, reject) => {
            const numericDate = user.date_of_birth;
            const textualDate = this.textualizeDate(numericDate);
            user.date_of_birth = textualDate;
            this.validate.user(user)
            .then(() => {
                this.system.replaceUser(username, user)
                .then((res) => {
                    fulfill(res);
                })
                .catch((err) => {
                    reject(err)
                })
            }).catch((err) => {
                reject(err)
            });    
        });
    }

    public delete(username: string): Promise<IResponse> {
        return this.system.removeUser(username);
    }

    protected textualizeDate(numericDate: string): string {
        const months          = ["January", "February", "March", "April", "May", "June", "July",
                                 "August", "September", "October", "November", "December"];
        const splittedDate    = numericDate.split("-");
        const year            = splittedDate[0]
        const month           = months[parseInt(splittedDate[1]) - 1];
        const day             = splittedDate[2]

        return month + ' ' + day  + ', ' + year 
    }

    protected numeralizeDate(textualDate: string): string {
        const months          = ["January", "February", "March", "April", "May", "June", "July",
                                 "August", "September", "October", "November", "December"];
        const splittedDate    = textualDate.split(" ");
        const year: any       = splittedDate[2];
        let month: any        = months.indexOf(splittedDate[0]) + 1 
        let day: any          = parseInt(splittedDate[1])

        month = (month <= 9)? '0' + month : month
        day   = (day <= 9)?   '0' + day   : day

        return year + '-' + month + '-' + day
    }
}