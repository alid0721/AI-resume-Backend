const {schema,model}= require('mongoose')

const userSchema = new schema({
    name:{
        type:String,
        required:[true,'Name is required'],
        unique:true,
        lowercase:true,
        trim:true
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:[true,'Email already exists'],
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    accountType:{
        type:String,
        enum:['individual','Business'],
        default:'individual'
    },
})

const User=model('User',userSchema)
module.exports=User