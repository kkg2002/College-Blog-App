const express = require("express");
const router=express.Router();
const req = require("express/lib/request");
const isLoggedIn= require("../index").isLoggedIn;


router.get('/login',(req,res)=>{
    const user=req.session.username;
    const isLoggedIn=req.session.isLoggedIn;
    res.render("login.ejs",{isLoggedIn,user});
});
router.get('/signup',(req,res)=>{
    const isLoggedIn =req.session.isLoggedIn;
    const user=req.session.username;

    res.render("signup.ejs",{isLoggedIn,user});
});
module.exports =router;


