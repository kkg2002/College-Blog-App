const express = require("express");
const post = require("../model/post");
const User = require("../model/user");


const month=['Jan',"Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const router=express.Router();

router.get("/profile",async(req,res)=>{
    const user=req.session.username;
    const isLoggedIn=req.session.isLoggedIn;
    const blogs=await post.find({author:user});
    const user_data=await User.findOne({username:user});
    
    // console.log(user_data);
    
    res.render('profile.ejs',{blogs,isLoggedIn,user,month,user_data});
})

module.exports=router;