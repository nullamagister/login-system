import { Gender, IUser } from '../controller/ISystem';
import Validator from '../controller/Validate'

describe("Valid Users", () => {
    let validator: Validator;

    beforeEach(() => {
        validator = new Validator();
    });

    it("Valid user: one", async () => {
        const user: IUser = {
            first_name: "oneoneone",
            last_name: "oneoneone",
            date_of_birth: "May 23, 1997",
            gender: Gender.Female,
            secret: {username: "oneoneon", 
                     password: "123456789Aa", 
                     email: "one@email.com"}
        }

        const result = await validator.user(user);
        expect(result.code).toBe(202)
    });

    it("Valid user: two", async () => {
        const user: IUser = {
            first_name: "twotwotwo",
            last_name: "twotwotwo",
            date_of_birth: "April 17, 1998",
            gender: Gender.Male,
            secret: {username: "twotwotw", 
                     password: "123456789sS", 
                     email: "two@email.com"}
        }

        const result = await validator.user(user);
        expect(result.code).toBe(202)
    });
});

describe("Invalid Users", () => {
    let validator: Validator;

    beforeEach(() => {
        validator = new Validator();
    });

    it("Invalid name: min-length", async () => {
        const user: IUser = {
            first_name: "abc",
            last_name: "one",
            date_of_birth: "May 23, 1997",
            gender: Gender.Female,
            secret: {username: "one", 
                     password: "123456789Aa", 
                     email: "one@email.com"}
        }

        try{
            await validator.user(user);
        } catch (err) {
            expect(err.code).toBe(402)
        }        
    });

    it("Invalid name: max-length", async () => {
        const user: IUser = {
            first_name: "abcabcabcabcabcab",
            last_name: "one",
            date_of_birth: "May 23, 1997",
            gender: Gender.Female,
            secret: {username: "one", 
                     password: "123456789Aa", 
                     email: "one@email.com"}
        }

        try{
            await validator.user(user);
        } catch (err) {
            expect(err.code).toBe(402)
        }
    });

    it("Invalid name: character", async () => {
        const user: IUser = {
            first_name: "abcabcabc",
            last_name: "abc abc^abc",
            date_of_birth: "May 23, 1997",
            gender: Gender.Female,
            secret: {username: "one", 
                     password: "123456789Aa", 
                     email: "one@email.com"}
        }

        try{
            await validator.user(user);
        } catch (err) {
            expect(err.code).toBe(402)
        }
    });

    it("Invalid date: Month", async () => {
        const user: IUser = {
            first_name: "oneoneone",
            last_name: "oneoneone",
            date_of_birth: "Mays 23, 1997",
            gender: Gender.Female,
            secret: {username: "oneoneone", 
                     password: "123456789Aa", 
                     email: "one@email.com"}
        }

        try{
            await validator.user(user);
        } catch (err) {
            expect(err.code).toBe(402)
        }
    });

    it("Invalid date: day", async () => {
        const user: IUser = {
            first_name: "oneoneone",
            last_name: "oneoneone",
            date_of_birth: "Mays 33, 1997",
            gender: Gender.Female,
            secret: {username: "oneoneone", 
                     password: "123456789Aa", 
                     email: "one@email.com"}
        }

        try{
            await validator.user(user);
        } catch (err) {
            expect(err.code).toBe(402)
        }   
    });

    it("Invalid date: minimun year", async () => {
        const user: IUser = {
            first_name: "oneoneone",
            last_name: "oneoneone",
            date_of_birth: "Mays 23, 1940",
            gender: Gender.Female,
            secret: {username: "one", 
                     password: "123456789Aa", 
                     email: "one@email.com"}
        }

        try{
            await validator.user(user);
        } catch (err) {
            expect(err.code).toBe(402)
        }
    });

    it("Invalid date: maximum year", async () => {
        const user: IUser = {
            first_name: "oneoneone",
            last_name: "oneoneone",
            date_of_birth: "Mays 23, 2010",
            gender: Gender.Female,
            secret: {username: "abcabcabc", 
                     password: "123456789Aa", 
                     email: "one@email.com"}
        }

        try{
            await validator.user(user);
        } catch (err) {
            expect(err.code).toBe(402)
        }
    });

    it("Invalid date: character", async () => {
        const user: IUser = {
            first_name: "oneoneone",
            last_name: "oneoneone",
            date_of_birth: "Mays 23, five",
            gender: Gender.Female,
            secret: {username: "abcabcabc", 
                     password: "123456789Aa", 
                     email: "one@email.com"}
        }

        try{
            await validator.user(user);
        } catch (err) {
            expect(err.code).toBe(402)
        }
    });

    it("Invalid username: min-length", async () => {
        const user: IUser = {
            first_name: "oneoneone",
            last_name: "oneoneone",
            date_of_birth: "April 17, 1998",
            gender: Gender.Male,
            secret: {username: "abc", 
                     password: "123456789sS", 
                     email: "two@email.com"}
        }

        try{
            await validator.user(user);
        } catch (err) {
            expect(err.code).toBe(402)
        }
    });

    it("Invalid username: max-length", async () => {
        const user: IUser = {
            first_name: "oneoneone",
            last_name: "oneoneone",
            date_of_birth: "April 17, 1998",
            gender: Gender.Male,
            secret: {username: "abcabcabcabcabcab", 
                     password: "1234567890sS", 
                     email: "two@email.com"}
        }

        try{
            await validator.user(user);
        } catch (err) {
            expect(err.code).toBe(402)
        }
    });

    it("Invalid username: character", async () => {
        const user: IUser = {
            first_name: "oneoneone",
            last_name: "oneoneone",
            date_of_birth: "April 17, 1998",
            gender: Gender.Male,
            secret: {username: "one one#one$", 
                     password: "123456789sS", 
                     email: "two@email.com"}
        }

        try{
            await validator.user(user);
        } catch (err) {
            expect(err.code).toBe(402)
        }
    });

    it("Invalid password: character", async () => {
        const user: IUser = {
            first_name: "oneoneone",
            last_name: "oneoneone",
            date_of_birth: "April 17, 1998",
            gender: Gender.Male,
            secret: {username: "oneoneone", 
                     password: "123456789ss", 
                     email: "two@email.com"}
        }

        try{
            await validator.user(user);
        } catch (err) {
            expect(err.code).toBe(402)
        }
    });

    it("Invalid password: min-length", async () => {
        const user: IUser = {
            first_name: "oneoneone",
            last_name: "oneoneone",
            date_of_birth: "April 17, 1998",
            gender: Gender.Male,
            secret: {username: "oneoneone", 
                     password: "123456sS", 
                     email: "two@email.com"}
        }

        try{
            await validator.user(user);
        } catch (err) {
            expect(err.code).toBe(402)
        }
    });

    it("Invalid password: max-length", async () => {
        const user: IUser = {
            first_name: "oneoneone",
            last_name: "oneoneone",
            date_of_birth: "April 17, 1998",
            gender: Gender.Male,
            secret: {username: "oneoneone", 
                     password: "123456789123456789sSX", 
                     email: "two@email.com"}
        }

        try{
            await validator.user(user);
        } catch (err) {
            expect(err.code).toBe(402)
        }
    });

    it("Invalid email: identifier", async () => {
        const user: IUser = {
            first_name: "oneoneone",
            last_name: "oneoneone",
            date_of_birth: "April 17, 1998",
            gender: Gender.Male,
            secret: {username: "oneoneone", 
                     password: "1234567896789sS", 
                     email: "@email.com"}
        }

        try{
            await validator.user(user);
        } catch (err) {
            expect(err.code).toBe(402)
        }
    });

    it("Invalid email: @", async () => {
        const user: IUser = {
            first_name: "oneoneone",
            last_name: "oneoneone",
            date_of_birth: "April 17, 1998",
            gender: Gender.Male,
            secret: {username: "oneoneone", 
                     password: "1234567896789sS", 
                     email: "twoemail.com"}
        }

        try{
            await validator.user(user);
        } catch (err) {
            expect(err.code).toBe(402)
        }
    });

    it("Invalid email: website", async () => {
        const user: IUser = {
            first_name: "oneoneone",
            last_name: "oneoneone",
            date_of_birth: "April 17, 1998",
            gender: Gender.Male,
            secret: {username: "oneoneone", 
                     password: "1234567896789sS", 
                     email: "two@.com"}
        }

        try{
            await validator.user(user);
        } catch (err) {
            expect(err.code).toBe(402)
        }
    });

    it("Invalid email: .com", async () => {
        const user: IUser = {
            first_name: "oneoneone",
            last_name: "oneoneone",
            date_of_birth: "April 17, 1998",
            gender: Gender.Male,
            secret: {username: "oneoneone", 
                     password: "1234567896789sS", 
                     email: "twoe@two"}
        }

        try{
            await validator.user(user);
        } catch (err) {
            expect(err.code).toBe(402)
        }
    });
});