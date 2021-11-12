const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const OrderSchema = new Schema({
    customerId: {
        type: String,
        required: true
    },
    workerId: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    workerName: {
        type: String,
        required: true
    },
    workerMobile: {
        type: String,
        required: true
    },
    customerMobile: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'On going', 'Completed'],
        required: true
    },
})

const Order = mongoose.model("order", OrderSchema);

module.exports = Order