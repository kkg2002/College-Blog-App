const express = require("express");
const  createController  = require("../controllers/createController");

const router= express.Router();

router.get("/create-post",createController.getInputForm);
router.post("/create-post",createController.createPost);

module.exports=router;
