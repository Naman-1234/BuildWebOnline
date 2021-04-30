const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema ={
    name:{
        type:String,
        default:'Anoymous'
    },
    phoneNo:{
        type:String,
        required:true,
        length:10,
        validate(value)
        {
            if(!validator.isMobilePhone(value))
            throw new Error('Phone Number not valid');
        }
    },
    gender:{
        type:String,
        enum:['Male','Female'],
        required:true
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value))
            throw new Error('Email not valid');
        }
    },
    password:{
        type:String,
        minLength:6,
        required:true
    },
}
//Before saving we will use bcrypt to secure the password
userSchema.pre('save',function(next){
    const user = this;
    if(user.isModified('password')){
        user.password=bcrypt.hash(user.password,8);
    }
    //Calling next Middleware function 
    next();
})

const User = mongoose.model('User',userSchema);
module.exports=User;