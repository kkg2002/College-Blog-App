const express=require("express");
const bodyparser=require("body-parser");
const mongodb=require("mongoose");
const path=require("path");
const session = require("express-session");
const MongoDBStore=require("connect-mongodb-session")(session);
const req = require("express/lib/request");
const port =process.env.PORT || 5000;
const Post=require("./model/post");
const month=['Jan',"Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];


const authRoutes=require("./routers/auth");
const registerRoutes=require("./routers/register");
const postRoutes=require("./routers/post");
const createRoutes=require("./routers/create");
const readRoutes=require("./routers/read");
const profileRoutes=require("./routers/profile");
const detailRoutes=require("./routers/detail");
const deleteRoutes=require("./routers/delete");


const MONGODB_URI="mongodb+srv://krishna2002:bhai@atlascluster.jlxnfqi.mongodb.net/blog?retryWrites=true&w=majority";

const store=new MongoDBStore({uri:MONGODB_URI,collection:"sessions"});

const app=express();
app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.set("view engine","ejs");
app.use(session({secret: "my secret", resave: false, saveUninitialized: false, store: store}));

app.get('/',async(req,res)=>{
    const isLoggedIn=req.session.isLoggedIn;
    const user=req.session.username;
    let blogs=await Post.find({});
    let l=blogs.length;
    // console.log(l,l-5);
    let l1=0;
    if(l-5>0)
        l1=l-5;
    blogs=blogs.slice(l1,l);
    res.render("home.ejs",{isLoggedIn,user,blogs,month});
});

app.use(registerRoutes);
app.use(postRoutes);
app.use(createRoutes);
app.use(authRoutes);
app.use(readRoutes);
app.use(profileRoutes);
app.use(detailRoutes);
app.use(deleteRoutes);


app.listen(port,()=>{
    console.log("connected at ",port);
});


mongodb.connect(MONGODB_URI,()=>{
    console.log("Connected to mongoose");
});
