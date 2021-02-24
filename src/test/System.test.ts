import { Gender, IUser } from '../controller/ISystem';
import System from '../controller/System';

describe("Add User", () => {
    let system: System;
    let validUser: IUser;
    let invalidUser: IUser;

    beforeAll(() => {
        system = new System(); 
        validUser = {
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
        invalidUser = {
            first_name: "myNameIs",
            last_name: "myNameIs",
            date_of_birth: "Junuary 33, 1992",
            gender: Gender.Male,
            secret: {
                username: "myInValidUser1",
                password: "myPassworWd",
                email: "myEmail@website.com"
            }
        }
    })

    it("Valid Addition", async () => {
        try {
            const result  = await system.addUser(validUser);
            expect(result.code).toBe(200);
        } catch(err) {
            fail();
        }
        
    });

    it("Invalid Addition: Validation", async () => {
        try {
            const result  = await system.addUser(invalidUser);
            fail();
        } catch(err) {
            expect(err.code).toBe(402);
        }
    });

    it("Invalid Addition: already-exists", async () => {
        try {
            const result  = await system.addUser(validUser);
            fail();
        } catch(err) {
            expect(err.code).toBe(400);
        }
    });
});

describe("Modify User", () => {
    let system: System;
    let validUser1: IUser;
    let validUser2: IUser;

    beforeEach(async () => {
        system = new System(); 
        validUser1 = {
            first_name: "myNameIs",
            last_name: "myNameIs",
            date_of_birth: "May 23, 1992",
            gender: Gender.Male,
            secret: {
                username: "myValidUser1",
                password: "myPassword",
                email: "myEmail@website.com"
            }
        }
        validUser2 = {
            first_name: "myNameIs",
            last_name: "myNameIs",
            date_of_birth: "January 28, 1992",
            gender: Gender.Male,
            secret: {
                username: "myValidUser2",
                password: "myPassword",
                email: "myEmail@website.com"
            }
        }

        await system.addUser(validUser1);
        await system.addUser(validUser2);
    })

    it("Valid Modification: with new username", async () => {
        const username = validUser1.secret.username;

        try {
            const result = await system.modifyUser(username, {
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

    it("Valid Modification: without new username", async () => {
        const username = validUser1.secret.username;

        try {
            const result = await system.modifyUser(username, {
                first_name: "modifiedName",
                last_name: "ModifiedName",
                date_of_birth: "April 7, 2000",
                gender: Gender.Female,
                secret: {
                    username: validUser1.secret.username,
                    password: "ModifiedPass",
                    email: "Modified@website.com"
                }
            }); 
            expect(result.code).toBe(200);
        } catch (err) {
            fail();
        }
    });


    it("Invalid Modification: Validation", async () => {
        const username = validUser1.secret.username;

        try {
             await system.modifyUser(username, {
                first_name: "modifiedName",
                last_name: "ModifiedName",
                date_of_birth: "April 7, 2000",
                gender: Gender.Female,
                secret: {
                    username: "ModifiedUN",
                    password: "notvalidpass",
                    email: "Modified@website.com"
                }
            }); 
            fail();
        } catch (err) {
            //console.log(err);
            expect(err.code).toBe(402);
        }
    });

    it("Invalid Modification: new username exists", async () => {
        const username = validUser1.secret.username;

        try {
            await system.modifyUser(username, {
                first_name: "modifiedName",
                last_name: "ModifiedName",
                date_of_birth: "April 7, 2000",
                gender: Gender.Female,
                secret: {
                    username: "myValidUser2",
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
            const result = await system.modifyUser(username, {
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
    let system: System;
    let user: IUser;

    beforeEach(async () => {
        system = new System(); 
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
    })


    it("Valid Deletion", async () => {
        try {
            const result = await system.deleteUser(user.secret.username);
            expect(result.code).toBe(200);
        } catch (err ){
            fail()
        }
    });

    it("Invalid Deletion: not-exist", async () => {
        try {
            const result = await system.deleteUser("NotExist");
            fail()
        } catch (err){
            expect(err.code).toBe(400);
        }
    });
});