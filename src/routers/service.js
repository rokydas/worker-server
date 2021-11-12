const express = require('express')
const mongoose = require('mongoose');
const router = express.Router();
const Service = require("../models/Service")

router.get('/service/:category', async (req, res) => {
    const category = req.params.category

    try {
        const services = await Service.find({ category: category });
        res.status(200).send({ success: true, services })

    } catch {
        res.status(400).send({ success: false, msg: "something went wrong" })
    }
})

module.exports = router