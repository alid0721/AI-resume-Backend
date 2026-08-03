const {schema, model} = require('mongoose');

const resumeSchema = new schema({
    userId: {
        type: schema.Types.ObjectId,
        ref:'User',
    },
    originalFileName:{
        type:String,
        required:[true,'Original file name is required'],
        lowercase:true,
        unique:true,
    },
    resumeText:{
        type:String,
        required:true
    },
    uploadDate:{
        type:Date,
        default:Date.now
    }
    
})

const Resume = model('Resume', resumeSchema);
module.exports = Resume;