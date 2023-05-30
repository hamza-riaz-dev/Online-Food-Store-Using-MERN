const express = require('express');
const router = express.Router();
const order = require('../Models/Orders')

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data;
    await data.splice(0, 0, { order_date: req.body.orderDate })

    let emailAddress = await order.findOne({ 'email': req.body.email })
    console.log(emailAddress);
    if (emailAddress === null) {
        try {
            await order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }

    else {
        try {
            await order.findOneAndUpdate({ email: req.body.email },
                {
                    $push: { order_data: data }
                }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            res.send("Server Error", error.message)
        }
    }
})

router.post('/myorderData', async (req, res) => {
    try {
        let myData = await order.findOne({ 'email': req.body.email })
        res.json({ orderData: myData })
    } catch (error) {
        res.send("Server Error", error.message)
    }
})

module.exports = router;