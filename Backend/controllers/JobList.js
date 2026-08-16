const router = require('express').Router()
const verifyToken = require('../middleware/verify-token.js')
const JobDescription = require('../models/JobDescription.js')
const User = require('../models/User.js')
const Job = require('../models/Job.js')
const companyOnly = require('../middleware/companyOnly.js')
const authenticate = require('../middleware/authenticate.js')

router.get('/',verifyToken,async(req,res)=>{
    try{
        const allJobs= await Job.find().populate([
            'company','title'
        ])
        res.json(allJobs)
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

router.get('/:JobId',verifyToken,async(req,res)=>{
    try{
        const foundJob = await Job.findById(req.params.JobId)
        res.json(foundJob)
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

router.post('/',verifyToken,authenticate,companyOnly,async(req,res)=>{
    try{
        req.body.author=req.user._id

        const newListing= await Job.create(req.body)
        newListing.company=req.user

        res.status(201).json(newListing)
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

router.put('/:JobId',verifyToken,authenticate,companyOnly,async(req,res)=>{
    try{

        const foundJob= await Job.findById(req.params.JobId)
        console.log(foundJob.company)
        console.log(req.user._id)
        if(!foundJob.author.equals(req.user._id)){
            return res.status(403).json({error:'You are not authorized to update this job listing'})
        }

        const updatedJob= await Job.findByIdAndUpdate(req.params.JobId,req.body,{new:true})
        res.json(updatedJob)
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

router.delete('/:JobId',verifyToken,authenticate,companyOnly,async(req,res)=>{
    try{
        const {JobId}=req.params
        console.log(JobId)

        const foundJob= await Job.findById(JobId)

        if(!foundJob.company.equals(req.user._id)){
            return res.status(403).json({error:'You are not authorized to delete this job listing'})
        }
        console.log('after found job')

        const deletedJob= await Job.findByIdAndDelete(JobId)
        console.log(deletedJob)

        res.json(deletedJob)
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
})

module.exports=router