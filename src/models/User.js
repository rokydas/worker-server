const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum : ['worker','customer'],
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: false
    },
    cost: {
        type: Number,
        required: false
    },
    experience: {
        type: Number,
        required: false
    },
})

const User = mongoose.model("user", UserSchema);

module.exports = User