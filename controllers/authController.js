const req = require("express/lib/request");
const user = require("../model/user");

exports.logout=(req,res)=>{
    req.session.isLoggedIn=false;
    req.session.username=null;

    res.redirect("/");
};

exports.postSignUp = async(req,res)=> {
    // console.log("In post signup");
    
    user.create({
        name: req.body.fullName,
        email:req.body.email,
        password:req.body.password,
        admin: true,
        username: req.body.email.split(['@'])[0],
        posts: [{}]
    })
    
    req.session.isLoggedIn=true;
    req.session.username=req.body.email.split(['@'])[0];
    res.redirect("/");
};

exports.postLogin=async(req,res)=>{

    let User=await user.findOne({email:req.body.email,password:req.body.password});

    if(User){
        req.session.isLoggedIn=true;
        req.session.username=User.username;
        res.redirect("/");
    }
    else
    {
        alert("wrong username or password");
        res.redirect("/login");
    }
};