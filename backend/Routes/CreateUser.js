const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const jwtSecret = "qwertyuiopasdfghjklzxcvbnm123456";

router.post("/createuser", [
    body('email', 'Please enter a valid email address').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Minimum password length should be 5 characters').isLength({ min: 5 })],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            await User.create({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
                address: req.body.address
            });
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })

router.post("/loginuser", [
    body('email', 'Please enter a valid email address').isEmail(),
    body('password', 'Minimum password length should be 5 characters').isLength({ min: 5 })],
    async (req, res) => {

        let email = req.body.email;
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            let userData = await User.findOne({ email });

            if (!userData) {
                return res.status(400).json({ errors: "Email is incorrect" });
            }
            if (!(req.body.password === userData.password)) {
                return res.status(400).json({ errors: "Password is incorrect" });
            }

            const data = {
                user: {
                    id: userData.id
                }
            }

            const authToken = jwt.sign(data, jwtSecret)

            return res.json({ success: true, authToken: authToken })
        }

        catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })

module.exports = router; 