const express = require('express')
const mongoose = require('mongoose');
const router = express.Router();
const User = require("../models/User")

router.post('/addUser', async (req, res) => {
    try {
        let user;
        if(req.body.role == 'customer') {
            user = new User({
                name: req.body.name,
                email: req.body.email,
                role: req.body.role,
                mobileNumber: req.body.mobileNumber,
                address: req.body.address
            })
        } else {
            user = new User({
                name: req.body.name,
                email: req.body.email,
                role: req.body.role,
                mobileNumber: req.body.mobileNumber,
                address: req.body.address,
                service: req.body.service,
                cost: req.body.cost,
                experience: req.body.experience
            })
        }
    
        await user.save().then(() => {
            res.status(200).send({success: true, msg: "User saved successfully"})
        }) .catch(err => {
            console.log(err)
        })
    } catch {
        res.status(400).send({success: false, msg: "Something went wrong"})
    }
})

router.get('/user/:email', async (req, res) => {
    const email = req.params.email
    const user = await User.find({email: email});
    if(user.length > 0) {
        res.status(200).send({success: true, role: user[0].role, id: user[0]._id})
    } else {
        res.status(400).send({success: false, msg: "user not found"})
    }
})

router.get('/workers/:service/:criteria?', async (req, res) => {
    const service = req.params.service;
    const criteria = req.params.criteria;
    // console.log(typeof req.params.criteria)

    let users;
    if(service != 'undefined') {
        if(typeof criteria == "undefined") {
            users = await User.find({service: service});
        } else {
            if(criteria == "location") {
                users = await User.find({service: service}).sort({address: 1});
            }
            else if(criteria == "work") {
                users = await User.find({service: service}).sort({address: 1});
            }
            else if(criteria == "experience") {
                users = await User.find({service: service}).sort({experience: 1});
            }
            else {
                users = await User.find({service: service}).sort({cost: 1});
            }
        }
    } else {
        if(typeof criteria == "undefined") {
            users = await User.find({});
        } else {
            if(criteria == "location") {
                users = await User.find({}).sort({address: 1});
            }
            else if(criteria == "work") {
                users = await User.find({}).sort({address: 1});
            }
            else if(criteria == "experience") {
                users = await User.find({}).sort({experience: 1});
            }
            else {
                users = await User.find({}).sort({cost: 1});
            }
        }
        
    }
    res.status(200).send({success: true, users})
})

router.get('/services/:ca', async (req, res) => {
    const services = await Service.find().select({ title: 1 }).sort({ title: -1 })
    console.log(services)
})

module.exports = router