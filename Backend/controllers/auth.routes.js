const User= require('../models/User.js')

const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/verify-token.js')

router.post('/sign-up', async(req,res)=>{
    try{
        const foundUser = await User.findOne({email:req.body.email})

        if (foundUser){
            return res.status(309).json({err:"User already exists"})}
        
        const createdUser = await User.create({
            email:req.body.email,
            hashedPassword: bcrypt.hashSync(req.body.password,12),
            name:req.body.name,
        })
        console.log(createdUser)

        const convertedObject = createdUser.toObject()
        delete convertedObject.hashedPassword
        res.json(convertedObject)

    }
    

    catch(err){
        res.status(500).json({err:err.message})
    }
})

router.post('/login',async(req,res)=>{
    //destructure the request body
    const {email,password}=req.body
    try{
        // check if the user exists in the database
        const foundUser= await User.findOne({email})
        // if the user does not exist, return an error
        if(!foundUser){
            return res.status(404).json({err:'User not found'})
        }
        // check if the password is correct
        const isPasswordCorrect= bcrypt.compareSync(password,foundUser.password)
        if (!isPasswordCorrect){
            return res.status(401).json({err:'email or password is incorrect'})
        }

        const payload=foundUser.toObject()
        delete payload.password

        const token= jwt.sign({payload},process.env.JWT_SECRET,{expiresIn:'30m'})

        res.status(200).json({token})
    }
    catch(err){
        res.status(500).json({err:err.message})
    }

})

router.get('/verify',verifyToken,(req,res)=>{
    console.log(req.user)
    res.json(req.user)
})

module.exports=router