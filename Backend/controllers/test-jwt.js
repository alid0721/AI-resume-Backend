const router=require('express').router()
const jwt=require('jsonwebtoken')
const verifyToken=require('../middleware/verify-token.js')

router.get('/checkout',verifyToken,(req,res)=>{

    res.json({message:'You are checked out'})
})

router.get('/sign-token',async(req,res)=>{
    const user={
        _id:1,
        name:'John Doe'
    }

    const token=jwt.sign({user},process.env.JWT_SECRET,{expiresIn:'1h'})
    res.json({token:token})
})

router.post('/verify',(req,res)=>{
    try{
        console.log(req.headers.authorization.split(" ")[1])

        const token= req.headers.authorization.split(" ")[1]
    
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        res.json({decoded:decoded})
    }
    catch(err){
        res.status(401).json({err:err.message})
    }
})

module.exports=router