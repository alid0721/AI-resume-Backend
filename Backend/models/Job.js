const {Schema,model}=require('mongoose')

const JobSchema=new Schema({
    company:{
        type:Schema.Types.ObjectId,
        required:[true,'Company name is required'],
        ref:'User'
    },

    title:{
        type:String,
        required:true,
    },

    jobDescriptionText:{
        type:String,
        required:true
    },

    requirements:[String],

    location:String,

    employmentType:{
        type:String,
        enum:['Full-time','Part-time','Internship','Contract']
    },

    createdAt:{
        type: Date,
        default: Date.now
    }

})

const Job = model('Job',JobSchema)

module.exports=Job