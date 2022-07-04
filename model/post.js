const { default: mongoose } = require("mongoose");
const  Mongoose = require("mongoose");

const postSehema=new Mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    type: {
        type:String,
        required:true
    },
    content: {
        type:String,
        required:true
    },
    author: {
        type:String,
        required:true
    },
    date: {
        type:Date
    },
    img: {
        type:String
    }

});

module.exports=mongoose.model('post',postSehema);