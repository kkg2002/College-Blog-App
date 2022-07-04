const req = require("express/lib/request");
const Post = require("../model/post");
const User = require("../model/user");


exports.getInputForm=(req,res)=>{
    const isLoggedIn=req.session.isLoggedIn;
    const user=req.session.username;

    // console.log(isLoggedIn," in crete post get ");
    res.render("create-post.ejs",{isLoggedIn,user});
};

exports.createPost=async(req,res)=>{
    const isLoggedIn=req.session.isLoggedIn;
    const user=req.session.username;

    // console.log(req.body);
    // console.log(isLoggedIn," in createpost ",user);
    const p=await Post.create({
        title:req.body.title,
        content:req.body.content,
        type:req.body.type,
        author:user,
        date:new Date(),
        img:req.body.img
    })
    
    const u=await User.findOneAndUpdate({username:user},
        {
            $push:{
                blog:p._id,
            }
    });
    
    // u[0].posts.push(p._id);
    // console.log(u);
    res.redirect("/");

};