const User=require('../models/userModel')
const jwt=require('jsonwebtoken')

// logic for register

exports.userRegister=async (req,res)=>{
    const {username,password,email,role}=req.body
    try {
        const existingUser=await User.findOne({email})
        if(existingUser){
            res.status(401).json("User already exist")
        }else{
            const newUser =new User({username,email,password,role})
        await newUser.save()
        res.status(200).json({message:"User Added Successfully",newUser})
        }
        
    } catch (error) {
        res.status(500).json("error"+error)
        
    }
}

exports.userLogin=async(req,res)=>{
    const {password,email}=req.body
    try {
        const existingUser= await User.findOne({email})
        if(existingUser){
            if(existingUser.password==password){
                const token=jwt.sign({email:existingUser.email,role:existingUser.role},process.env.jwtkey)
                console.log(token);
                
                res.status(200).json({message:"Login Success",existingUser,token})
            }else{
                res.status(401).json("Incorrect password")
            }
        }else{
            res.status(401).json("User Not Exist")
        }
        
    } catch (err) {
        res.status(500).json("error"+err)
        
    }
}
exports.googleLogin= async(req,res)=>{
    console.log("inside googleLogin");
    const {username,email,password,profile}=req.body
    
    try {
        const existingUser= await User.findOne({email})
        if(existingUser){
            //genarate token
            const token=jwt.sign({email:existingUser.email,role:existingUser.role},process.env.jwtkey)
                console.log(token);
                res.status(200).json({message:"Login Success",existingUser,token})
        }else{
            const newUser=new User({username,email,password,profile})
            await newUser.save()
            //genarate token
             const token=jwt.sign({usermail:newUser.email,role:newUser.role},process.env.jwtkey)
             console.log(token);
             res.status(200).json({message:"User Added successfully",newUser,token})
        }
        
    } catch (error) {
        console.log("error",error);
        
        
    }
}
