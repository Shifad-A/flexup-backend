require('dotenv').config()

const express =require('express')
const cors=require('cors')
require('./config/db')
const route=require('./Routes/route')


const flexupServer=express()
flexupServer.use(cors())
flexupServer.use(express.json())
flexupServer.use(route)


const PORT= 3000 || process.env.PORT

flexupServer.get('/',(req,res)=>{
    res.send("welcome to flexup backend")
})

flexupServer.listen(PORT,()=>{
    console.log(`flexupServer running on the${PORT}`);
})