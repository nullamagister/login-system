import IResponse from "../controller/IResponse";
import { IUser } from "../controller/ISystem";

export default interface IWebView {
    register(user: IUser): Promise<IResponse>;

    login(username: string, password: string): Promise<IResponse>;

    logout(username: string): Promise<IResponse>;

    update(username: string, user: IUser): Promise<IResponse>;

    delete(username: string): Promise<IResponse>;

    getData(username: string): Promise<IResponse>;
}