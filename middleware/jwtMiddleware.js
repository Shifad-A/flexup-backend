const jwt =require('jsonwebtoken')
const jwtMiddleware=(req,res,next)=>{
    try {
        const token=req.headers.authorization.slice(7)
        const jwtVerification=jwt.verify(token,process.env.jwtKey)
        console.log(jwtVerification);
    } catch (error) {
        console.log("Authorization error"+error) 
    }
    next()
}
module.exports=jwtMiddleware