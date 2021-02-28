import ICloneAlgo from "./ICloneAlgo";
import { IUser } from "./ISystem";
import {cloneDeep} from "lodash";

export default class LodashCloneAlgo implements ICloneAlgo{
    user(user: IUser): IUser {
        return cloneDeep(user);
    }

    users(users: IUser[]): IUser[] {
        return cloneDeep(users);
    }
}