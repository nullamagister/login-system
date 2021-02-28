import { IUser } from "./ISystem";

export default interface ICloneAlgo {
    /**
     * Clone Algorithm
     * @param user the user to be clonned
     * @returns a copy of user
     */
    user(user: IUser): IUser;

    /**
     * Clone Algorithm
     * @param users the users list to be clonned
     * @returns a copy of users
     */
    users(users: IUser[]): IUser[];
}