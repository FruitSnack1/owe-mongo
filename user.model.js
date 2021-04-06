import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    created: {
        type: Date,
        default: Date.now()
    },
    address: {
        city: String,
        street: String
    }
}, {
    collection: 'uzivatele'
})


export default mongoose.model('User', userSchema)