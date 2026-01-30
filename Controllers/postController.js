const Post=require('../models/postModel')

exports.createPost=(req,res)=>{
    console.log("inside createpost");
    res.send("posted Successfully")
       
}