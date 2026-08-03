const {schema, model} = require('mongoose');

const jobDescriptionSchema = new schema({
    userId: {
        type: schema.Types.ObjectId,
        ref:'User',
    },
    title:{
        type:String,
        required:[true,'Job title is required'],
        lowercase:true,
        
    },
    company:{
        type:String,
        required:[true,'Company name is required'],
        lowercase:true,
    },
    jobDescriptionText:{
        type:String,
        required:true
    },
    uploadDate:{
        type:Date,
        default:Date.now
    },
})

const JobDescription = model('JobDescription', jobDescriptionSchema);
module.exports = JobDescription;
