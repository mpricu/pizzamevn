import mongoose from 'mongoose';
const { Schema, model } = mongoose;

let pizzaSchema = new Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    vegan: {
        type: Boolean
    },
    options: [{ size: String, price: Number }],
}, {
    collection: 'pizzas'
})

export default model('Pizza', pizzaSchema)
