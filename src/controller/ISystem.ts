import IResponse from "./IResponse";

/**
 * This is our Login System Interface 
 */
export default interface ISystem {

    /**
     * Get the all registered users
     * @returns code: 200, data: list of users
     */
    getUsers(): Promise<IResponse>;


    /**
     * Get the all active users
     * @returns code: 200, data: list of active users
     */
    getActiveUsers(): Promise<IResponse>;

    /**
     * Login the user with the given username and password
     * @param username the username of the user
     * @param password the password of the user
     * @returns code: 200 if succeeded, otherwise code: 400
     */
    login(username: string, password: string): Promise<IResponse>;

    /**
     * Logout the user with the given username
     * @param username the username of the user
     * @returns code: 200 if succeeded, otherwise code: 400
     */
    logout(username: string): Promise<IResponse>;

    /**
     * Register a user
     * @returns code: 200 if succeeded, otherwise code: 400
     */
    addUser(user: IUser): Promise<IResponse>;

    /**
     * Updata the use of the given username by the given user
     * @param username the username of the given user to be updated
     * @param user the new user object to update by
     * @returns code: 200 if succeeded, otherwise code: 400
     */
    replaceUser(username: string, user: IUser): Promise<IResponse>;

    /**
     * delete the user of the given username
     * @param username the username of the user to be deleted
     * @returns code: 200 if succeeded, otherwise code: 400
     */
    removeUser(username: string): Promise<IResponse>;
}

/**
 * This is our User Interface
 */
export interface IUser {
    first_name: string
    last_name: string
    date_of_birth: string
    gender: Gender
    secret: ISecret
}

/**
 * An enumeration of User Gender. It is one ofe:
 *  - Male
 *  - Female
 */
export enum Gender{
    Male,
    Female
}

/**
 * The Secret information of a User that contains:
 *  - username
 *  - password
 *  - email
 */
export interface ISecret{
    username: string
    password: string
    email: string
}