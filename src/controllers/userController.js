const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const viewHome = (req,res)=>{
    res.render('index',{
        user:session.username
    });
}

const viewContect = (req,res)=>{
    res.render('contectUS',{
        user:session.username
    });
}

const viewLogin = (req,res) =>{
    res.render('login');
}

const viewSignUp = (req,res) =>{
    res.render('signup');
}

const signup = async (req,res)=>{
    try{
        var username = req.body.username;
        var email = req.body.email;
        var country = req.body.country;
        var dob = req.body.dob;
        var gender = req.body.gender;
        var phone = req.body.phone;
        var password = req.body.password;
        var cpassword = req.body.cnf_password;

        if(password == cpassword)
        {
            const userData = new User({name:username,email:email,country:country,dob:dob,gender:gender,mobileNo:phone,password:password,confirmpassword:cpassword});

            const result = await userData.save();

            if(result)
            {
                res.redirect('/login');
            }
        }
        else
        {
            res.render('signup',{
                message:"Passwords must be same"
            });
        }
    }
    catch(err)
    {
        res.send(err);
    }
}

const login = async (req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        
        const user = await User.findOne({email:email});

        const isMatch = await bcrypt.compare(password,user.password);
        
        if(isMatch)
        {
            session.username = user.name;
            console.log(session.username);
            if(user.name == "Admin")
            {
                res.redirect('/Category');
            }
            else
            {
                res.redirect('/');
            }
        }
        else
        {
            // res.send('<script>alert("Invalid Login Details")</script>');
            res.render('login',{
               message : 'Invalid Login Details'
            });
        }
    }
    catch(err)
    {
        console.log(err);
    }
}

const logout = async(req,res)=>{
    try{
        session.username = "";
        //session destroy method does not work
        session.destroy;
        res.redirect('/');
    }
    catch(err)
    {
        console.log(err);
    }
}

module.exports = {
    viewHome,
    viewContect,
    viewLogin,
    viewSignUp,
    signup,
    login,
    logout
}