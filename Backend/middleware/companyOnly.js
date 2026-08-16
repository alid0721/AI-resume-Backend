const companyOnly=(req,res,next)=>{
    if(req.user.accountType!=='Business'){
        return res.status(403).json({
            message:'Company account required'
        })
    }
    next()
}
module.exports=companyOnly