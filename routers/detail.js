const express = require("express");
const post = require("../model/post");
const User = require("../model/user");


const month=['Jan',"Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const router=express.Router();

router.post("/detail",async(req,res)=>{
    const user=req.session.username;
    const user_detail=req.body.user_name;
    const isLoggedIn=req.session.isLoggedIn;
    const blogs=await post.find({author:user_detail});
    const user_data=await User.findOne({username:user_detail});

    if(user_data==undefined)
    {
        res.send(user+' not exist');
    }
    else
    {
        res.render('profile.ejs',{blogs,isLoggedIn,user,month,user_data});
    }
    // console.log(user_data);
    
});

router.get("/detail:id",async(req,res)=>{
    
    
    const user=req.session.username;
    const user_detail=req.params.id.split(":")[1];
    const isLoggedIn=req.session.isLoggedIn;
    console.log(user_detail);
    const blogs=await post.find({author:user_detail});
    const user_data=await User.findOne({username:user_detail});

    if(user_data==undefined)
    {
        res.send(user+' not exist');
    }
    else
    {
        res.render('profile.ejs',{blogs,isLoggedIn,user,month,user_data});
    }
    // console.log(user_data);
    
});

module.exports=router;