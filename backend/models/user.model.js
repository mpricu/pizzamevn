import mongoose from 'mongoose';
const { Schema, model } = mongoose;

let userSchema = new Schema({
    id: {
        type: Number
    },
    userName: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    addresses: [{
        id: Number, street: String, number: Number
    }],
}, {
    collection: 'users'
})

export default model('User', userSchema)
