const express = require("express");
const { path } = require("express/lib/application");
const postController=require("../controllers/postController");
const router= express.Router();



router.get("/blog",postController.getAllBlogs);

router.get("/notice",postController.getAllNotices);

router.get("/interview",postController.getAllInterview);
module.exports =router;