import { Gender, IUser } from '../controller/ISystem';
import System from '../controller/System';

const db: string = 'mongodb://127.0.0.1:27017/myTestData';

describe("Login System", () => {
    let system: System;

    beforeAll(async () => {
        system = System.getSystem(db); 
    });

    afterAll(async () => {
        await system.disconnectDatabase();
    });
    
    describe("Login User", () => {
        let user: IUser;

        beforeAll(async () => {
            user = {
                first_name: "myNameIs",
                last_name: "myNameIs",
                date_of_birth: "May 23, 1992",
                gender: Gender.Male,
                secret: {
                    username: "myValidUser",
                    password: "myPasswoArd",
                    email: "myEmail@website.com"
                }
            }
    
            await system.addUser(user);
        });

        afterAll(async () => {
            await system.removeUser(user.secret.username);
        });

        it("Valid Login", async () => {
            try {
                const result = await system.login(user.secret.username, user.secret.password);
                expect(result.code).toBe(200);
            } catch (err) {
                fail();
            }
        });
    
        it("Invalid Login: username", async () => {
            try {
                await system.login("NotFoundUsnm", user.secret.password);
                fail();
            } catch (err) {
                expect(err.code).toBe(400);
            }
        });
    
        it("Invalid Login: password", async () => {
            try {
                await system.login(user.secret.username, "NotFoundPass");
                fail();
            } catch (err) {
                expect(err.code).toBe(400);
            }
        });
    
        it("Invalid Login: already logged in", async () => {
            try {
                const result = await system.login(user.secret.username, user.secret.password);
                expect(result.code).toBe(200);
                await system.login(user.secret.username, user.secret.password);
                fail();
            } catch (err) {
                expect(err.code).toBe(400);
            }
        });
    });

    describe("Logout User", () => {
        let user: IUser;

        beforeAll(async () => {
            user = {
                first_name: "myNameIs",
                last_name: "myNameIs",
                date_of_birth: "May 23, 1992",
                gender: Gender.Male,
                secret: {
                    username: "myValidUser",
                    password: "myPasswoArd",
                    email: "myEmail@website.com"
                }
            }
    
            await system.addUser(user);
    
        });

        afterAll(async () => {
            await system.removeUser(user.secret.username);
        });

        it("Valid Logout", async () => {
            try {
                const result = await system.logout(user.secret.username);
                expect(result.code).toBe(200);
            } catch (err) {
                console.log(err)
                fail();
            }
        });
    
        it("Invalid Logout: usrname", async () => {
            try {
                await system.logout("NotFound");
                fail();
            } catch (err) {
                expect(err.code).toBe(400);
            }
        });
    });

    describe("Add User", () => {
        let user: IUser;

        beforeAll(() => {
            user = {
                first_name: "validUser",
                last_name: "validUser",
                date_of_birth: "May 23, 1992",
                gender: Gender.Male,
                secret: {
                    username: "validUser",
                    password: "validUser",
                    email: "validUser@website.com"
                }
            }
        });

        afterAll(async () => {
            await system.removeUser(user.secret.username);
        });

        it("Valid Addition", async () => {
            try {
                const result  = await system.addUser(user);
                expect(result.code).toBe(200);
            } catch(err) {
                fail();
            }
            
        });
    
        it("Invalid Addition: already-exists", async () => {
            try {
                const result  = await system.addUser(user);
                fail();
            } catch(err) {
                expect(err.code).toBe(400);
            }
        });
    });

    describe("Modify User", () => {
        let user: IUser;
        let existed: IUser;
    
        beforeAll(async () => {
            user = {
                first_name: "myNameIs",
                last_name: "myNameIs",
                date_of_birth: "May 23, 1992",
                gender: Gender.Male,
                secret: {
                    username: "myValidUser1",
                    password: "myPassword",
                    email: "myEmail@website.com"
                }
            };

            existed = {
                first_name: "myNameIs",
                last_name: "myNameIs",
                date_of_birth: "May 23, 1992",
                gender: Gender.Male,
                secret: {
                    username: "existedUser",
                    password: "myPassword",
                    email: "myEmail@website.com"
                }
            };
    
            await system.addUser(user);
            await system.addUser(existed);
        });
    
        afterAll(async () => {
            await system.removeUser("ModifiedUN");
            await system.removeUser(existed.secret.username);
            await system.disconnectDatabase();
        });
    
        it("Valid Modification: without new username", async () => {
            const username = user.secret.username;
    
            try {
                const result = await system.replaceUser(username, {
                    first_name: "modifiedName",
                    last_name: "ModifiedName",
                    date_of_birth: "April 7, 2000",
                    gender: Gender.Female,
                    secret: {
                        username: user.secret.username,
                        password: "ModifiedPass",
                        email: "Modified@website.com"
                    }
                }); 
                expect(result.code).toBe(200);
            } catch (err) {
                fail();
            }
        });

        it("Valid Modification: with new username", async () => {
            const username = user.secret.username;
    
            try {
                const result = await system.replaceUser(username, {
                    first_name: "modifiedName",
                    last_name: "ModifiedName",
                    date_of_birth: "April 7, 2000",
                    gender: Gender.Female,
                    secret: {
                        username: "ModifiedUN",
                        password: "ModifiedPass",
                        email: "Modified@website.com"
                    }
                }); 
                expect(result.code).toBe(200);
            } catch (err) {
                fail();
            }
        });
    
        it("Invalid Modification: new username exists", async () => {
            const username = user.secret.username;
    
            try {
                await system.replaceUser(username, {
                    first_name: "modifiedName",
                    last_name: "ModifiedName",
                    date_of_birth: "April 7, 2000",
                    gender: Gender.Female,
                    secret: {
                        username: "existedUser",
                        password: "abCabcABCASDWD",
                        email: "Modified@website.com"
                    }
                }); 
                fail();
            } catch (err) {
                expect(err.code).toBe(400);
            }
        });
    
    
        it("Invalid Modification: username not-exist", async () => {
            const username = "NotExistUN";
    
            try {
                const result = await system.replaceUser(username, {
                    first_name: "modifiedName",
                    last_name: "ModifiedName",
                    date_of_birth: "April 7, 2000",
                    gender: Gender.Female,
                    secret: {
                        username: "ModifiedUN",
                        password: "ModifiedPass",
                        email: "Modified@website.com"
                    }
                }); 
                fail();
            } catch (err) {
                expect(err.code).toBe(400);
            }
        });
    });

    describe("Delete User", () => {
        let user: IUser;
    
        beforeAll(async () => {
            user = {
                first_name: "myNameIs",
                last_name: "myNameIs",
                date_of_birth: "May 23, 1992",
                gender: Gender.Male,
                secret: {
                    username: "myValidUser1",
                    password: "myPasswoArd",
                    email: "myEmail@website.com"
                }
            }
    
            await system.addUser(user);
        });
    
        it("Valid Deletion", async () => {
            try {
                const result = await system.removeUser(user.secret.username);
                expect(result.code).toBe(200);
            } catch (err ){
                fail()
            }
        });
    
        it("Invalid Deletion: not-exist", async () => {
            try {
                await system.removeUser("NotExist");
                fail()
            } catch (err){
                expect(err.code).toBe(400);
            }
        });
    });
});

