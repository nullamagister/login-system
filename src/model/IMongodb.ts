import IResponse from "../controller/IResponse";
import { IUser } from "../controller/ISystem";

/**
 * This is our interface of Mongodb class that handles database
 */
export default interface IMongodb {

    /**
     * Connect to database server
     * @returns code: 204 if succeeded, otherwise code: 404
     */
    connect(): Promise<IResponse>;

    /**
     * Disconnect from database server
     * @returns code: 204 if succeeded, otherwise code: 404
     */
    disconnect(): Promise<IResponse>;

    /**
     * Retrive all users that exists in our database
     * @returns code: 204, data: a list of IUser
     */
    getUsers(): Promise<IResponse>;

    /**
     * Delete the current database
     * @returns code: 204 if succeeded, otherwise code: 404
     */
    destroy(): Promise<IResponse>;

    /**
     * Add the given user to the database
     * @param user the IUser obj that will be added to our database
     * @requires user has a valid pattern
     * @returns code: 204 if succeeded, otherwise code: 404
     */
    addUser(user: IUser): Promise<IResponse>;

    /**
     * Replace the given username user by the given IUser 
     * @param username the username of the user to be replaced
     * @param user the IUser obj that will be added to our database
     * @requires user has a valid pattern
     * @returns code: 204 if succeeded, otherwise code: 404
     */
    replaceUser(username: string, user: IUser): Promise<IResponse> 


    /**
     * Remove the given user from the database
     * @param user the IUser obj that will be removed from our database
     * @returns code: 204 if succeeded, otherwise code: 404
     */
    removeUser(username: string): Promise<IResponse>;
 }