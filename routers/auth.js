const express = require("express");
const { route } = require("express/lib/application");
const authController  = require("../controllers/authController");
const req = require("express/lib/request");
const router=express.Router();

router.get("/login",(req,res)=>{
    
    const isLoggedIn=req.session.isLoggedIn;
    const user=req.session.username;

    res.render("login",{isLoggedIn,user});
});

router.get("/signup",(req,res)=>{
    const isLoggedIn=req.session.isLoggedIn;
    const user=req.session.username;

    res.render("signup",{isLoggedIn,user});
});
router.post("/login",authController.postLogin);

router.post("/signup",authController.postSignUp);

router.get("/logout",authController.logout);



module.exports=router;