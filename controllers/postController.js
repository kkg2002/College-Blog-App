const req = require("express/lib/request"); // this is for login /log out
const Post=require("../model/post");

const month=['Jan',"Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

exports.getAllBlogs=async(req,res)=>{
    const isLoggedIn= req.session.isLoggedIn;
    const user=req.session.username;

    try{
        const blogs=await Post.find({type:"blog"});
        // res.setHeader("Set-Cookie","blogs=[{a,b,c}]");
        // console.log(isLoggedIn," in blogs ");
        res.render("blog.ejs",{blogs,isLoggedIn,user,month});
    }
    catch(err){
        console.log("error in controllers/postController.js");
    }
}

exports.getAllNotices= async(req,res)=>{
    const isLoggedIn= req.session.isLoggedIn;
    const user=req.session.username;

    const notice=await Post.find({type:'notice'})
    // console.log(notice);
    // console.log(isLoggedIn," in notice ");
    res.render("notice.ejs",{isLoggedIn,user,notice,month});
};

exports.getAllInterview= async(req,res)=>{
    const isLoggedIn= req.session.isLoggedIn;
    const user=req.session.username;

    const interview=await Post.find({type:'interview'})
    
    res.render("interview.ejs",{isLoggedIn,user,interview,month});
};
