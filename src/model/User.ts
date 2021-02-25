import mongoose from 'mongoose';

const secreSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    secret: secreSchema
});

const User = mongoose.model("user", userSchema, "users")

export default User;