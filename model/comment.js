const  Mongoose = require("mongoose");

const commentSehema=new Mongoose.Schema({
    content:{
        type:Array,
    },
    
    blogid:{
        type:String
    }

});

module.exports=Mongoose.model('comment',commentSehema);