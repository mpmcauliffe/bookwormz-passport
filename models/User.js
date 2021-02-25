const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    books:[{ 
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }],
})


module.exports = mongoose.model('User', UserSchema)
