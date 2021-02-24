import IResponse from "./IResponse";
import { IUser } from "./ISystem";

/**
 * This is the interface of our Validator
 */
export default interface IValidate{
    /**
     * Check wether the given user is valide
     * @param user the User object that will be checked for validation
     * @returns code: 202 if succeeded, otherwise 402
     */
    user(user: IUser): Promise<IResponse>;
}