const {schema,model}= require('mongoose')

const analysisSchema = new schema({
    userId: {
        type: schema.Types.ObjectId,
        ref:'User',
    },
    resumeId: {
        type: schema.Types.ObjectId,
        ref:'Resume',
    },
    jobDescriptionId: {
        type: schema.Types.ObjectId,
        ref:'JobDescription',
    },
    atsScore:{
        type:Number,
        required:true
    },
    MatchingSkills:{
        type:[String],
        required:true
    },
    MissingSkills:{
        type:[String],
        required:true
    },
    recommendations:{
        type:[String],
        required:true
    },
    uploadDate:{
        type:Date,
        default:Date.now
    }
})

const Analysis=model('Analysis',analysisSchema)
module.exports=Analysis