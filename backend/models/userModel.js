const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = mongoose.Schema ({
    firstName: {
        type: String,
        required: [true, 'Please enter your first name.']
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your last name.']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email.'],
        unique: [true, 'That email is already in use.']
    },
    accountType: {
        type: String,
        required: [true, 'Please choose Student or Parent account.']
    },
    admin: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: [true, 'Please choose a password.'],
        min: [8, 'Please use at least 8 characters.']
    }
}, {
    timestamps: true
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);