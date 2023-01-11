const mongoose = require('mongoose');

const addressScehma = mongoose.Schema({
    street: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zipCode: {
        type: String
    }
})

const parentSchema = mongoose.Schema({
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
        unique: [true, "Email already in use."],
        lowercase: true,
        trim: true,
        required: [true, "Please enter a valid email."],
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: '{VALUE} is not a valid email!'
        }
    },
    address: {
        type: [addressScehma]
    },
    phone: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(v);
            },
            message: '{VALUE} is not a valid phone number!'
        }
    },
})

const studentSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter your first name.']
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your last name.']
    },
    studentId: {
        type: String,
        required: [true, 'Please enter your Student ID number.'],
        unique: [true, 'This student number is already in use.']
    },
    gradeLevel: {
        type: String,
        required: [true, 'Please enter your current grade level.']
    },
    instrument: {
        type: String,
        default: [],
        required: [true, 'Please enter your primary instrument or vocal range.']
    },
    ensembles: {
        type: String,
        default: [],
        required: [true, 'Please enter at least one ensemble membership.']
    },
    email: {
        type: String,
        unique: [true, "Email already in use."],
        lowercase: true,
        trim: true,
        required: [true, "Please enter a valid email."],
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: '{VALUE} is not a valid email!'
        }
    },
    address: {
        type: [addressScehma]
    },
    phone: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(v);
            },
            message: '{VALUE} is not a valid phone number!'
        }
    },
    parent: {
        type: [parentSchema]
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('Student', studentSchema);