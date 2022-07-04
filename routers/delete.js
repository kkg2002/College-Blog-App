const express = require("express");
const req = require("express/lib/request");
const Comment = require("../model/comment");
const Post = require("../model/post");
const User = require("../model/user");
const mongoose =require("mongoose")
const router= express.Router();

const month=['Jan',"Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];


router.get("/delete:id",async(req,res)=>{

    const isLoggedIn=req.session.isLoggedIn;
    const user=req.session.username;
    
    var id=req.params.id.split(":")[1];
    id = mongoose.Types.ObjectId(id);

    const user_post=await User.findOneAndUpdate({username:user},
        {$pull:{
            "blog":{
                $in:id,
            }
        }});
    if(user_post==undefined)
    {
        console.log("You can't delete this post")
        const redirectory="/read:"+id;
        res.redirect(redirectory);
    }
    else
    {
        const post=await Post.findOneAndDelete({_id:id});

        const redirectory="/";
        res.redirect(redirectory);        
    }
    
});

module.exports=router;