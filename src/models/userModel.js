const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        validate(value)
        {
            if(!validator.isEmail(value))
            {
                throw new Error('email is Invalid');
            }
        },
        unique:true
    },
    country:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    mobileNo:{
        type:Number,
        required:true,
        unique:true,
        minlength:10
    },
    password:{
        type:String,
        required:true
    }
});


userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password,10);
    next();
});

const userModel = new mongoose.model('User',userSchema);

module.exports = userModel;