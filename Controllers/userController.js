const User=require('../models/userModel')

// logic for register

exports.userRegister=async (req,res)=>{
    const {username,password,email}=req.body
    try {
        const existingUser=await User.findOne({email})
        if(existingUser){
            res.status(401).json("User already exist")
        }else{
            const newUser =new User({username,email,password})
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
                res.status(200).json({message:"Login Success",existingUser})
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
