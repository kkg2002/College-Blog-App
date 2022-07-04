const express = require("express");
const req = require("express/lib/request");
const Comment = require("../model/comment");
const Post = require("../model/post");
const User = require("../model/user");
const window=require('window')
const router= express.Router();

const month=['Jan',"Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

router.get("/read:id",async(req,res)=>{
    const isLoggedIn=req.session.isLoggedIn;
    const user=req.session.username;

    const id=req.params.id.split(":")[1];
    const blogs=await Post.find({_id:id});
    let comment=await Comment.find({blogid:id});
    if(comment.length>0)
        comment=comment[0].content;
    
    // console.log(blogs);
    
    res.render('read.ejs',{blogs:blogs[0],isLoggedIn,user,comment,month});
});

router.post("/read:id",async(req,res)=>{

    const isLoggedIn=req.session.isLoggedIn;
    const user=req.session.username;
    
    const id=req.params.id.split(":")[1];

    // console.log(req.body);
    
    const content={user:user,
        comment:req.body.comment,
        date:new Date()
    };
    console.log(content);

    let comment=await Comment.find({blogid:id});

    if(comment.length>0)
    {
        comment= await Comment.findOneAndUpdate({blogid:id},{
            $push:{
                content:{
                    $each:[content],
                    $position:0
                
                }                
            }
        });
        
    }
    else
    {
        comment= await Comment.create({
            blogid:id,

            content:content            

        });
    }
    console.log(comment);

    await User.findOneAndUpdate({username:user},
    {
        $push:{
            comment:comment._id
        }
    });

    const blogs=await Post.find({_id:id});
    comment=await Comment.find({blogid:id});
    if(comment.length>0)
        comment=comment[0].content;
    console.log(comment);

    const redirectory="/read:"+id;
    res.redirect(redirectory);
    
});

module.exports=router;