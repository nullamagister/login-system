import { Gender, IUser } from '../controller/ISystem';
import Mongodb from '../model/Mongodb';

describe("Add User", () => {
    let url:string;
    let mongodb: Mongodb;
    let user: IUser;

    beforeAll(() => {
        url     = 'mongodb://127.0.0.1:27017/myTestData';
        mongodb = new Mongodb(url);
        mongodb.connect();
        user    = {
            first_name: "one",
            last_name: "one",
            date_of_birth: "May 5, 2008",
            gender: Gender.Male,
            secret: {
                username: "oneoneone",
                password: "oneoneoneONE",
                email: "one@email.com"
            }
        }
    });

    afterAll(async () => {
        await mongodb.destroy();
        await mongodb.disconnect();
    })

    it("Valid add user", async () => {
        try {
            const result = await mongodb.addUser(user);
            expect(result.code).toBe(204)
        } catch (err) {
            fail();
        }
    });

    it("Invalid add user: internal error", async () => {
        try {
            await mongodb.disconnect();
            await mongodb.addUser(user);
            fail();
        } catch (err) {
            await mongodb.connect();
            expect(err.code).toBe(404)
        }
    }, 20000);
});


describe("Remove User", () => {
    let url:string;
    let mongodb: Mongodb;
    let user: IUser;

    beforeAll(async () => {
        url     = 'mongodb://127.0.0.1:27017/myTestData';
        mongodb = new Mongodb(url);
        mongodb.connect();
        user    = {
            first_name: "one",
            last_name: "one",
            date_of_birth: "May 5, 2008",
            gender: Gender.Male,
            secret: {
                username: "oneoneone",
                password: "oneoneoneONE",
                email: "one@email.com"
            }
        }
        await mongodb.addUser(user);
        await mongodb.addUser(user);
        await mongodb.addUser(user);
    });

    afterAll(async () => {
        await mongodb.destroy();
        await mongodb.disconnect();
    });

    it("Valid remove user", async () => {
        try {
            const result = await mongodb.removeUser("oneoneone");
            const users  = await mongodb.getUsers();
            expect(result.code).toBe(204);
            expect(users.code).toBe(204);
            expect(<IUser[]> users.data).toHaveLength(2);
        } catch (err) {
            fail();
        }
    });

    it("Invalid remove user: not found", async () => {
        try {
            await mongodb.removeUser("one2oneone");
            fail();
        } catch (err) {
            const users = await mongodb.getUsers();
            expect(err.code).toBe(404);
            expect(users.code).toBe(204);
            expect(<IUser[]> users.data).toHaveLength(2);
            
        }
    });

    it("Invalid reomve user: internal error", async () => {
        try {
            await mongodb.disconnect()
            await mongodb.removeUser("one2oneone");
            fail();
        } catch (err) {
            await mongodb.connect();
            const users = await mongodb.getUsers();
            expect(err.code).toBe(404);
            expect(users.code).toBe(204);
            expect(<IUser[]> users.data).toHaveLength(2);
            
        }
    }, 20000);
});


describe("Replace User", () => {
    let url:string;
    let mongodb: Mongodb;
    let user1: IUser;
    let user2: IUser;

    beforeAll(async () => {
        url     = 'mongodb://127.0.0.1:27017/myTestData';
        mongodb = new Mongodb(url);
        mongodb.connect();
        user1    = {
            first_name: "one",
            last_name: "one",
            date_of_birth: "May 5, 2008",
            gender: Gender.Male,
            secret: {
                username: "oneoneone",
                password: "oneoneoneONE",
                email: "one@email.com"
            }
        }
        user2    = {
            first_name: "two",
            last_name: "two",
            date_of_birth: "May 5, 2008",
            gender: Gender.Male,
            secret: {
                username: "twotwotwoTW",
                password: "twotwotwoTWO",
                email: "two@email.com"
            }
        }

        await mongodb.addUser(user1);
        await mongodb.addUser(user2);
    });

    afterAll(async () => {
        await mongodb.destroy();
        await mongodb.disconnect();
    });

    it("Valid replace user", async () => {
        try {
            const result = await mongodb.replaceUser(user1.secret.username, {
                first_name: "NewName",
                last_name: "NewName",
                date_of_birth: "March 6, 1990",
                gender: Gender.Female,
                secret: {
                    username: "UsernameNew",
                    password: "NewPassword",
                    email: "NewEmail@website.com"
                }});
            expect(result.code).toBe(204);
        } catch (err) {
            fail();
        }
    });

    it("Invalid replace user: not found", async () => {
        try {
            await mongodb.replaceUser("NotFound", {
                first_name: "NewName",
                last_name: "NewName",
                date_of_birth: "March 6, 1990",
                gender: Gender.Female,
                secret: {
                    username: "UsernameNew",
                    password: "NewPassword",
                    email: "NewEmail@website.com"
                }});
            fail();
        } catch (err) {
            expect(err.code).toBe(404);
        }
    });

    it("Invalid replace user: internal error", async () => {
        try {
            await mongodb.disconnect();
            await mongodb.replaceUser(user1.secret.username, {
                first_name: "NewName",
                last_name: "NewName",
                date_of_birth: "March 6, 1990",
                gender: Gender.Female,
                secret: {
                    username: "UsernameNew",
                    password: "NewPassword",
                    email: "NewEmail@website.com"
                }});
            fail();
        } catch (err) {
            mongodb.connect();
            expect(err.code).toBe(404);
        }
    }, 20000);
});