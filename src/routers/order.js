const express = require('express')
const mongoose = require('mongoose');
const router = express.Router();
const Order = require("../models/Order");

router.post('/addOrder', async (req, res) => {
    try {

        const order = new Order({
            customerId: req.body.customerId,
            workerId: req.body.workerId,
            customerName: req.body.customerName,
            workerName: req.body.workerName,
            category: req.body.category,
            status: req.body.status,
            customerMobile: req.body.customerMobile,
            workerMobile: req.body.workerMobile
        })

        await order.save().then(() => {
            res.status(200).send({success: true, msg: "Order placed successfully"})
        }) .catch(err => {
            console.log(err)
        })
    } catch {
        res.status(400).send({success: false, msg: "something went wrong"})
    }
})

router.get('/orderForCustomer/:id', async (req, res) => {
    const id = req.params.id
    const orders = await Order.find({customerId: id});
    if(orders) {
        res.status(200).send({success: true, orders})
    } else {
        res.status(400).send({success: false, msg: "something went wrong"})
    }
    
})

router.get('/orderForWorker/:id', async (req, res) => {
    const id = req.params.id
    const orders = await Order.find({workerId: id});
    if(orders) {
        res.status(200).send({success: true, orders})
    } else {
        res.status(400).send({success: false, msg: "something went wrong"})
    }
})

router.post('/updateOrder/:id', async (req, res) => {
    const id = req.params.id;
    const query = {'_id': id};
    const update = {'status': req.body.status}

    Order.updateOne(query, update)
        .then(result => {
            if(result.nModified > 0) {
                res.status(200).send({success: true})
            } else {
                res.status(400).send({success: false, msg: "something went wrong"})
            }
        })
        .catch(err => {
            res.status(400).send({success: false, msg: "something went wrong"})
        })
})

module.exports = router