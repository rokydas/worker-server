const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const ServiceSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
})

const Service = mongoose.model("service", ServiceSchema);

module.exports = Service