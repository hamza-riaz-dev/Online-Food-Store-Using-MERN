const express = require('express')
const router = express.Router()
const User = require('../Model/User')
const { body, validationResult } = require('express-validator');
const jwt = require ("jsonwebtoken")
const bcrypt = require("bcrypt");
const jwtSecret ="MyFirstMernStackProject"

router.post("/CreateUser",
body('email').isEmail(),
body('name').isLength({min:5}),
body('password','Wrong Password Enter').isLength({min:5}),
async (req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password,salt)

    try{
        await User.create({
            name: req.body.name,
            password:secPassword,
            email:req.body.email,
            location:req.body.location
    })

    res.json({success:true}); 

    } catch(error){
        console.log(error)
        res.json({success:false});
    }
}
)

/* Login */
router.post("/loginuser",
body('email').isEmail(),
body('password','Wrong Password Enter').isLength({min:5})
,async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    let email = req.body.email;

    try{
        let userData = await User.findOne({email});

        if(!userData){
            return res.status(400).json({error:"Please enter correct email"})
        }
        
        const passwordcomparison = await bcrypt.compare(req.body.password,userData.password)
        if( !passwordcomparison){
            return res.status(400).json({error:"Please enter correct password"})
        }

        const data = {
            id : userData.id
        }
        const authToken = jwt.sign(data,jwtSecret) 
        return res.json({success:true,authToken:authToken})

    }catch(error){
        console.log(error)
        res.json({success:false});
    }
}
)

module.exports = router;